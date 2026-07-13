import { Search, RotateCcw } from "lucide-react";

const ReportFilter = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {

  const handleReset = () => {

    setSearch("");

    setStatus("All");

  };

  return (

    <div className="report-filter">

      {/* Search */}

      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search report by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Status */}

      <div className="filter-select">

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="All">
            All Reports
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Pending">
            Pending
          </option>

        </select>

      </div>

      {/* Reset */}

      <button
        className="reset-btn"
        onClick={handleReset}
      >

        <RotateCcw size={18} />

        Reset

      </button>

    </div>

  );

};

export default ReportFilter;