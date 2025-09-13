// Sidebar component with filters, category selection, and search input
import ActionButton from "../action-button/ActionButton";

export default function Aside({
  filter,
  setFilter,
  category,
  setCategory,
  search,
  setSearch,
  openModal,
}) {
  return (
    <aside>
      <ActionButton className="static-action-button" onClick={openModal} />
      <div className="filter-buttons text-center my-3">
        <button
          className="btn btn-outline-primary filter-btn"
          data-filter="all"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="btn btn-outline-info filter-btn"
          data-filter="active"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="btn btn-outline-secondary filter-btn"
          data-filter="completed"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="text-center my-3">
        <select
          id="category-filter"
          className="form-select w-auto d-inline-block"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          <option value="work">Work</option>
          <option value="private">Private</option>
          <option value="school">School</option>
        </select>
      </div>
      <div className="text-center my-3">
        <input
          type="text"
          id="search-input"
          className="form-control w-75 mx-auto"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </aside>
  );
}
