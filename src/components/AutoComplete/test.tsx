import React from "react";
import AutoComplete from "./autocomplete";

const test = () => {
  const names = ["kobe", "carter", "mac"];
  // const select = (value: string) => {
  //     return names.filter(item => item.includes(value))
  // }
  //   const handleFetch = (query: string) => {
  //     return fetch(`https://api.github.com/search/users?q=${query}`)
  //       .then((res) => res.json())
  //       .then(({ items }) => {
  //         return items
  //           .slice(0, 10)
  //           .map((item) => ({ value: item.login, ...item }));
  //       });
  //   };
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.length > 3 ? items.slice(0, 3).map((item: any) => ({ value: item.login })) : items.map((item: any) => ({ value: item.login }))
      })
  }

  return (
    <div>
      <AutoComplete fetchSuggestions={handleFetch} />
    </div>
  );
};

export default test;
