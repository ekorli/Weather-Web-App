import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface SearchInputProps {
  onLocationSubmit: (location: string) => void;
  initialValue?: string;
  loading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onLocationSubmit,
  initialValue = "",
  loading = false,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationSubmit(inputValue.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mx-auto"
      style={{ maxWidth: "700px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="input-group mb-3">
        <span className="input-group-text bg-primary bg-opacity-10 border-0">
          <MapPin style={{ width: "24px", height: "24px", color: "#0d6efd" }} />
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city name (e.g., London, New York...)"
          className="form-control"
          disabled={loading}
        />
        <motion.button
          type="submit"
          className={`btn btn-primary px-4 ${
            loading || !inputValue.trim() ? "disabled" : ""
          }`}
          disabled={loading || !inputValue.trim()}
          whileHover={{ scale: loading || !inputValue.trim() ? 1 : 1.05 }}
          whileTap={{ scale: loading || !inputValue.trim() ? 1 : 0.95 }}
        >
          {loading ? (
            <span>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Searching...
            </span>
          ) : (
            <span>
              <Search
                style={{ width: "20px", height: "20px" }}
                className="me-2"
              />
              Search
            </span>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};
