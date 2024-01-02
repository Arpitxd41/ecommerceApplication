<div className="container mx-auto mt-5 p-4 bg-stone-950 rounded shadow-md flex flex-row justify-between space-x-8">
      {/* Filter controls */}
      <div className="float-left w-1/4 bg-yellow-300 p-4 rounded-md mb-4 text-white mt-4">
        <div className="sticky bg-stone-950 px-4 py-12 space-y-8 rounded-md">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Category:</p>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
            >
              <option value="">All *</option>
              {[uniqueCategories].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="block text-sm font-semibold">Min Rating:</p>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
              name="minRating"
              value={filter.minRating}
              onChange={handleFilterChange}
            >
              {/* Add rating options as needed */}
              <option value="">Any</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              {/* ... */}
            </select>
          </div>
          <div className="flex mb-4">
            <div className="mr-2">
              <p className="block text-sm font-semibold">Sort By:</p>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
                name="sortBy"
                value={filter.sortBy}
                onChange={handleFilterChange}
              >
                {sortByOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="block text-sm font-semibold">Order:</p>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
                name="order"
                value={filter.order}
                onChange={handleFilterChange}
              >
                {orderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="block text-sm font-semibold">Price Range:</p>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black font-semibold"
              name="priceRange"
              value={filter.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              {priceRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="bg-red-700 font-semibold text-white py-2 px-5 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleFilterSubmit}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="float-right w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>