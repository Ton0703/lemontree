import React, { useState, useEffect, useRef } from "react";
import Input, { InputPros } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";

interface DataSourceObject {
  value: string;
}
//DataSourceType包含了T和DataSourceObject
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputPros, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => React.ReactElement;
}

const Autocomplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [highLightIndex, setHighLightIndex] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(inputValue, 300);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const result = fetchSuggestions(debounceValue);
      //如果是异步，就用异步
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(result);
        setShowDropdown(true)
        if (result.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighLightIndex(-1);
  }, [debounceValue]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLightIndex(index);
    console.log(index);
  };
  //键盘操作下拉菜单
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highLightIndex]) {
          handleSelect(suggestions[highLightIndex]);
        }
        break;
      case 38:
        highlight(highLightIndex - 1);
        console.log(38);
        break;
      case 40:
        highlight(highLightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    triggerSearch.current = false;
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
  };
  //模版
  const renderTemplete = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="lemon-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="coffee" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames("suggestion-items", {
              "item-highlight": index === highLightIndex,
            });
            return (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className={classes}
              >
                {renderTemplete(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="lemon-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default Autocomplete;
