import React, { useState } from "react";
import { Modal, Input, List, Spin, Empty } from "antd";
import { Link } from "react-router-dom";

export default function SearchComponents({ open, onClose }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  
  const handleSearch = (value) => {
    setLoading(true);
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: "iPhone 15 Pro Max", price: "$1200" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: "$1100" },
        { id: 3, name: "Sony WH-1000XM5 Headphones", price: "$399" },
      ];
      const filtered = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Modal
        title="Search Products"
        open={open}
        onCancel={onClose}
        footer={null}
        width={600}
        centered
      >
        {/* Search bar */}
        <div className="mb-4 sticky top-0 z-10 bg-white pb-3">
          <Input.Search
            placeholder="Type to search..."
            allowClear
            enterButton="Search"
            size="large"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
          />
        </div>

        {/* Search results */}
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {loading ? (
            <div className="flex justify-center py-10">
              <Spin tip="Searching..." />
            </div>
          ) : results.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={results}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link to={`/product/${item.id}`} onClick={onClose}>
                        {item.name}
                      </Link>
                    }
                    description={
                      <span className="text-gray-600">{item.price}</span>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No products found" />
          )}
        </div>
      </Modal>
    </div>
  );
}
