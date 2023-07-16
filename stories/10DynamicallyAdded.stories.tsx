import React, { useState } from "react";
import { Button } from "@storybook/react/demo";
import SplitPane, { Pane } from "../src";
import "../src/themes/default.scss";

export default {
  title: "Basic",
};

type Item = { color: string; size: number | string };

const createItem = (size: number | string): Item => {
  const h = Math.floor(Math.random() * 360);
  return {
    color: `hsl(${h}, 50%, 75%)`,
    size,
  };
};

export const DynamicallyAdded = () => {
  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [items, setItems] = React.useState<Item[]>([
    createItem(100),
    createItem("auto"),
  ]);

  const setSizes = (sizes: (number | string)[]): void =>
    setItems((items) =>
      items.reduce<Item[]>((items, item, i) => {
        items.push({ ...item, size: sizes[i] });
        return items;
      }, [])
    );

  const sizes = React.useMemo(() => items.map((i) => i.size), [items]);

  const addItem = React.useCallback(
    () => setItems((items) => [...items, createItem("10%")]),
    []
  );

  return (
    <div style={{ height: 500 }}>
      <p>Add another item</p>
      <Button onClick={addItem}>Add item</Button>
      <SplitPane sizes={sizes} onChange={(sizes) => setSizes(sizes)}>
        {items.map((item, i) => (
          <div style={{ ...layoutCSS, background: item.color }} key={i}>
            pane {i}
          </div>
        ))}
      </SplitPane>
    </div>
  );
};
