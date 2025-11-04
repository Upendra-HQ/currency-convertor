import React, { useId } from "react";
import Select from "react-select";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();

  // Convert array of currency codes to objects
  const options = currencyOptions.map((cur) => ({
    value: cur,
    label: cur.toUpperCase(),
  }));

  // Custom style for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      borderColor: "transparent",
      cursor: "pointer",
      boxShadow: "none",
      "&:hover": { borderColor: "#93c5fd" },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  // Custom filter that matches only items starting with typed text
  const prefixFilter = (option, inputValue) => {
    if (!inputValue) return true;
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      {/* Amount input */}
      <div className="w-1/2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={id}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount === 0 ? "" : amount}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || val === null) {
              onAmountChange && onAmountChange(0);
            } else {
              onAmountChange && onAmountChange(Number(val));
            }
          }}
        />
      </div>

      {/* Searchable Dropdown */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <Select
          styles={customStyles}
          isDisabled={currencyDisabled}
          options={options}
          value={options.find((opt) => opt.value === selectCurrency)}
          onChange={(selected) =>
            onCurrencyChange && onCurrencyChange(selected.value)
          }
          filterOption={prefixFilter}   // ✅ our custom prefix search
          className="w-full text-left"
          placeholder="Select currency"
        />
      </div>
    </div>
  );
}

export default InputBox;
