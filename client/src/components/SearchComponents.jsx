import React, { useEffect } from "react";
import { Modal, Input, List, Spin, Empty, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, resetSearch, fetchSearchResults } from "../redux/slice/search-slice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SearchComponent({ open, onClose }) {
 const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query, results, loading } = useSelector((state) => state.search);

  
  const handleSearch = (value) => {
    dispatch(setQuery(value));
    if (value.trim()) {
      dispatch(fetchSearchResults({ query: value, page: 1, limit: 10 }));
    }
  };

  
  const handleProductClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      dispatch(resetSearch());
    }
  }, [open, dispatch]);

  return (
    <Modal
      title="Search Products"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="rounded-xl"
    >
      <Input.Search
        placeholder="Search for products..."
        enterButton="Search"
        size="large"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        loading={loading}
      />

      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Spin size="large" />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={results}
            locale={{ emptyText: "No products found" }}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleProductClick(item._id)}
                className="cursor-pointer hover:bg-gray-100 rounded-lg transition"
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.productImage?.[0]}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  }
                  title={<span className="font-semibold">{item.productName}</span>}
                  description={
                    <div className="text-sm text-gray-600">
                      <span className="block">{item.productBrand}</span>
                      <span className="text-[#db4444] font-bold">
                        ₹{item.salesPrice}
                      </span>{" "}
                      <span className="line-through text-gray-400">
                        ₹{item.productPrice}
                      </span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Modal>
  );
}