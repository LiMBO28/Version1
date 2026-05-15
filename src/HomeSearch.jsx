import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

/**
 * HomeSearch — Zillow-first home search redirect.
 * Builds a Zillow URL from the form filters and opens results in a new tab.
 * Falls back to Realtor.com if user prefers.
 * Free, no IDX. recolorado.com is intentionally NOT used — REcolorado does
 * not provide consumer property search.
 */
const HomeSearch = () => {
  const [city, setCity] = useState('');
  const [beds, setBeds] = useState('any');
  const [baths, setBaths] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propType, setPropType] = useState('any');
  const [source, setSource] = useState('zillow');

  const citySlug = () => (city.trim() || 'denver').toLowerCase().replace(/\s+/g, '-');

  const buildZillowUrl = () => {
    const region = `${citySlug()}-co`;
    const filterState = {};

    if (propType === 'single-family') filterState.isSingleFamily = { value: true };
    if (propType === 'condo') filterState.isCondo = { value: true };
    if (propType === 'townhouse') filterState.isTownhouse = { value: true };
    if (beds !== 'any') filterState.beds = { min: Number(beds) };
    if (baths !== 'any') filterState.baths = { min: Number(baths) };
    if (minPrice || maxPrice) {
      filterState.price = {};
      if (minPrice) filterState.price.min = Number(minPrice);
      if (maxPrice) filterState.price.max = Number(maxPrice);
    }

    if (Object.keys(filterState).length === 0) {
      return `https://www.zillow.com/${region}/`;
    }

    const searchState = { filterState, isListVisible: true };
    const params = new URLSearchParams({ searchQueryState: JSON.stringify(searchState) });
    return `https://www.zillow.com/${region}/?${params.toString()}`;
  };

  const buildRealtorUrl = () => {
    const slug = (city.trim() || 'Denver').replace(/\s+/g, '-');
    let path = `/realestateandhomes-search/${slug}_CO`;
    if (beds !== 'any') path += `/beds-${beds}`;
    if (baths !== 'any') path += `/baths-${baths}`;
    if (minPrice || maxPrice) {
      const lo = minPrice || '0';
      const hi = maxPrice || 'any';
      path += `/price-${lo}-${hi}`;
    }
    if (propType === 'single-family') path += '/type-single-family-home';
    if (propType === 'condo') path += '/type-condo';
    if (propType === 'townhouse') path += '/type-townhome';
    return `https://www.realtor.com${path}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const url = source === 'realtor' ? buildRealtorUrl() : buildZillowUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="search" className="py-24 md:py-32 bg-[#0a0a0a] text-[#fafaf8]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="block text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-medium text-[#a8854c] mb-5">
            Your Personal Search
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#fafaf8] font-light tracking-tight">
            <span className="italic">Search</span> Every Home <span className="italic">in Colorado.</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-[#fafaf8]/70 max-w-2xl mx-auto mt-6 leading-relaxed">
            Live MLS-powered results from Zillow & Realtor.com. Set your criteria — I&rsquo;ll handle the showings.
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-[#fafaf8] text-[#0a0a0a] p-6 md:p-10 border-t-2 border-[#a8854c]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">
                City or Neighborhood
              </label>
              <div className="flex items-center border-b border-[#0a0a0a]/30 focus-within:border-[#a8854c] transition-colors py-2">
                <Search size={18} strokeWidth={1.5} className="text-[#0a0a0a]/60 mr-3" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Denver, Boulder, Castle Rock, Aspen…"
                  className="flex-1 bg-transparent outline-none font-serif italic text-lg md:text-xl text-[#0a0a0a] placeholder-[#0a0a0a]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">Bedrooms</label>
              <select value={beds} onChange={(e) => setBeds(e.target.value)} className="w-full bg-transparent border-b border-[#0a0a0a]/30 focus:border-[#a8854c] outline-none py-2 font-serif text-lg">
                <option value="any">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">Bathrooms</label>
              <select value={baths} onChange={(e) => setBaths(e.target.value)} className="w-full bg-transparent border-b border-[#0a0a0a]/30 focus:border-[#a8854c] outline-none py-2 font-serif text-lg">
                <option value="any">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">Property Type</label>
              <select value={propType} onChange={(e) => setPropType(e.target.value)} className="w-full bg-transparent border-b border-[#0a0a0a]/30 focus:border-[#a8854c] outline-none py-2 font-serif text-lg">
                <option value="any">All</option>
                <option value="single-family">Single Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">Min Price</label>
              <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="$0" className="w-full bg-transparent border-b border-[#0a0a0a]/30 focus:border-[#a8854c] outline-none py-2 font-serif text-lg italic" />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">Max Price</label>
              <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="No max" className="w-full bg-transparent border-b border-[#0a0a0a]/30 focus:border-[#a8854c] outline-none py-2 font-serif text-lg italic" />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-[#0a0a0a]/60 mb-2">Search On</label>
              <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full bg-transparent border-b border-[#0a0a0a]/30 focus:border-[#a8854c] outline-none py-2 font-serif text-lg">
                <option value="zillow">Zillow</option>
                <option value="realtor">Realtor.com</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 pt-6 border-t border-[#0a0a0a]/10">
            <p className="text-xs text-[#0a0a0a]/55 max-w-md italic font-serif">
              Live results open in a new tab on {source === 'realtor' ? 'Realtor.com' : 'Zillow'}. Save anything you love and send it to me — I&rsquo;ll handle the showings.
            </p>
            <button type="submit" className="inline-flex items-center justify-center gap-3 bg-[#0a0a0a] text-[#fafaf8] px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#a8854c] transition-colors group">
              Search Homes
              <ExternalLink size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HomeSearch;
