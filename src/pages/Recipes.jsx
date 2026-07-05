import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Loader2, Salad, ChevronDown } from "lucide-react";
import { searchMeals, getCategoryList, getAreaList, filterByCategory, filterByArea } from "../utils/api";
import RecipeCard from "../components/RecipeCard";

const PER_PAGE = 9;

const FILTERS = [
  { key: "category", label: "Category", getOptions: getCategoryList, mapFn: (m) => m.strCategory },
  { key: "area", label: "Cuisine", getOptions: getAreaList, mapFn: (m) => m.strArea },
];

function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 h-10 px-3.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
          value
            ? "bg-brand-500/8 text-brand-300 border-brand-500/20"
            : "bg-white/[0.03] text-surface-500 border-white/[0.06] hover:border-white/[0.1] hover:text-surface-300"
        }`}
      >
        <span>{value || label}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 min-w-[180px] rounded-xl border border-white/[0.06] bg-surface-900/95 backdrop-blur-xl shadow-2xl py-1 z-20 animate-fade-down">
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
              !value ? "text-brand-300 bg-brand-500/8" : "text-surface-500 hover:text-surface-300 hover:bg-white/[0.04]"
            }`}
          >
            {label}
          </button>
          <div className="mx-3 h-px bg-white/[0.04]" />
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                value === opt ? "text-brand-300 bg-brand-500/8" : "text-surface-400 hover:text-surface-300 hover:bg-white/[0.04]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [activeFilters, setActiveFilters] = useState(() => ({
    category: searchParams.get("category") || "",
    area: searchParams.get("area") || "",
  }));
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef(null);

  const hasFilters = Object.values(activeFilters).some(Boolean);

  useEffect(() => {
    FILTERS.forEach(({ key, getOptions, mapFn }) => {
      getOptions().then((list) =>
        setFilterOptions((prev) => ({ ...prev, [key]: list.map(mapFn).filter(Boolean).sort() }))
      );
    });
  }, []);

  const fetchResults = useCallback(async (q, filters) => {
    setLoading(true);
    setVisibleCount(PER_PAGE);
    try {
      let results;
      if (filters.category) {
        results = await filterByCategory(filters.category);
      } else if (filters.area) {
        results = await filterByArea(filters.area);
      } else if (q.trim()) {
        results = await searchMeals(q);
      } else {
        results = [];
      }
      setMeals(results);
    } catch {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("category") || "";
    const area = searchParams.get("area") || "";
    if (q || cat || area) {
      fetchResults(q, { category: cat, area });
    }
  }, [searchParams, fetchResults]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < meals.length && !loadingMore) {
          setLoadingMore(true);
          requestAnimationFrame(() => {
            setVisibleCount((prev) => Math.min(prev + PER_PAGE, meals.length));
            setLoadingMore(false);
          });
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, meals.length, loadingMore]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (query.trim()) params.q = query.trim();
    if (activeFilters.category) params.category = activeFilters.category;
    if (activeFilters.area) params.area = activeFilters.area;
    setSearchParams(params);
  };

  const setFilter = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setActiveFilters({ category: "", area: "" });
    setQuery("");
    setSearchParams({});
    setMeals([]);
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-accent text-brand-400/80 text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 block">
            Recipe Search
          </span>
          <h1 className="section-title">Discover Recipes</h1>
          <p className="section-subtitle mx-auto">
            Search by name or filter by category and cuisine.
          </p>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-600" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search meals..."
                className="input-field pl-11"
              />
            </div>
            <button type="submit" className="btn-primary px-8" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Search"}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <SlidersHorizontal size={13} className="text-surface-600" />
            {FILTERS.map(({ key, label }) => (
              <FilterDropdown
                key={key}
                label={label}
                options={filterOptions[key] || []}
                value={activeFilters[key]}
                onChange={(val) => setFilter(key, val)}
              />
            ))}
            {hasFilters && (
              <button onClick={clearFilters} className="btn-ghost text-sm gap-1 ml-1">
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-accent overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-white/[0.04]" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-white/[0.06] rounded-lg w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-white/[0.04] rounded-lg w-full" />
                      <div className="h-3 bg-white/[0.04] rounded-lg w-5/6" />
                    </div>
                    <div className="pt-4 border-t border-white/[0.04]">
                      <div className="h-3 bg-white/[0.04] rounded-lg w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : meals.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-surface-600">
                  <span className="text-white font-semibold">{meals.length}</span> {meals.length === 1 ? "recipe" : "recipes"} found
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {meals.slice(0, visibleCount).map((meal, i) => (
                  <RecipeCard key={meal.idMeal} meal={meal} index={i} />
                ))}
              </div>

              {visibleCount < meals.length && (
                <div ref={sentinelRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {Array.from({ length: Math.min(PER_PAGE, meals.length - visibleCount) }).map((_, i) => (
                    <div key={i} className="card-accent overflow-hidden animate-pulse">
                      <div className="aspect-[4/3] bg-white/[0.04]" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-white/[0.06] rounded-lg w-3/4" />
                        <div className="space-y-2">
                          <div className="h-3 bg-white/[0.04] rounded-lg w-full" />
                          <div className="h-3 bg-white/[0.04] rounded-lg w-5/6" />
                        </div>
                        <div className="pt-4 border-t border-white/[0.04]">
                          <div className="h-3 bg-white/[0.04] rounded-lg w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : searchParams.toString() ? (
            <div className="card-accent-wine p-12 text-center max-w-lg mx-auto">
              <Salad size={34} className="mx-auto text-surface-600 mb-4" />
              <p className="text-surface-400 text-lg">No recipes matched your criteria.</p>
              <p className="text-surface-600 text-sm mt-2">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="card-accent p-12 text-center max-w-lg mx-auto">
              <Search size={34} className="mx-auto text-surface-600 mb-4" />
              <p className="text-surface-400 text-lg">Search for a recipe to get started.</p>
              <p className="text-surface-600 text-sm mt-2">Try "Pasta", "Chicken", or browse by category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
