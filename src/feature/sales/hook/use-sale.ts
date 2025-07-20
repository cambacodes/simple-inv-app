import { useCallback, useReducer } from "react";
import type {
  SaleItemFormData,
  SaleItemWithDetails,
  SaleIventoryItem,
  SelectedInventoryItem,
} from "../types";

type State = {
  items: SaleItemFormData[];
  inventoryMap: Record<number, SelectedInventoryItem>;
};

const initialState: State = {
  items: [],
  inventoryMap: {},
};

type Action =
  | { type: "ADD_ITEM" }
  | { type: "REMOVE_ITEM"; index: number }
  | {
      type: "UPDATE_ITEM_PRODUCT";
      index: number;
      inventoryItem: SaleIventoryItem;
    }
  | { type: "UPDATE_ITEM_QTY"; index: number; quantity: number }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems = [...state.items, { inventoryItemId: 0, quantity: 1 }];
      return newState(state, { items: newItems });
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((_, i) => i !== action.index);
      const usedIds = new Set(
        newItems.map((it) => it.inventoryItemId).filter((id) => id > 0)
      );
      const inventoryMap: Record<number, SelectedInventoryItem> = {};
      Object.keys(state.inventoryMap).forEach((k) => {
        const id = Number(k);
        if (usedIds.has(id)) inventoryMap[id] = state.inventoryMap[id]!;
      });
      return newState(state, { items: newItems, inventoryMap });
    }

    case "UPDATE_ITEM_PRODUCT": {
      const { index, inventoryItem } = action;
      const inventoryItemId = inventoryItem?.id ?? 0;

      const items = state.items.map((it, i) =>
        i === index ? { ...it, inventoryItemId } : it
      );

      let inventoryMap = state.inventoryMap;
      if (inventoryItem && inventoryItemId > 0) {
        inventoryMap = {
          ...state.inventoryMap,
          [inventoryItemId]: {
            id: inventoryItem.id,
            name: inventoryItem.name,
            price: inventoryItem.price,
            stock: inventoryItem.stock,
            description: inventoryItem.description,
          },
        };
      }

      return newState(state, { items, inventoryMap });
    }

    case "UPDATE_ITEM_QTY": {
      const { index, quantity } = action;
      const items = state.items.map((it, i) =>
        i === index ? { ...it, quantity: Math.max(1, quantity) } : it
      );
      return newState(state, { items });
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function newState(current: State, next: Partial<State>): State {
  let changed = false;
  const draft: State = { ...current };
  (Object.keys(next) as Array<keyof State>).forEach((k) => {
    if (next[k] !== undefined && draft[k] !== next[k]) {
      if (k === "items") {
        draft.items = next.items!;
      } else if (k === "inventoryMap") {
        draft.inventoryMap = next.inventoryMap!;
      }
      changed = true;
    }
  });
  return changed ? draft : current;
}

export function useSale() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = useCallback(() => dispatch({ type: "ADD_ITEM" }), []);
  const removeItem = useCallback(
    (index: number) => dispatch({ type: "REMOVE_ITEM", index }),
    []
  );
  const updateItemProduct = useCallback(
    (index: number, inventoryItem: SaleIventoryItem) =>
      dispatch({ type: "UPDATE_ITEM_PRODUCT", index, inventoryItem }),
    []
  );
  const updateItemQuantity = useCallback(
    (index: number, quantity: number) =>
      dispatch({ type: "UPDATE_ITEM_QTY", index, quantity }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const itemsWithDetails: SaleItemWithDetails[] = state.items.map((item) => {
    const inv = state.inventoryMap[item.inventoryItemId];
    const subtotal = inv ? item.quantity * inv.price : 0;
    const isValid = item.inventoryItemId > 0 && item.quantity > 0;
    return { ...item, subtotal, inventoryItem: inv, isValid };
  });

  const totalAmount = itemsWithDetails.reduce((t, i) => t + i.subtotal, 0);
  const validItemsCount = itemsWithDetails.filter((i) => i.isValid).length;

  return {
    items: state.items,
    itemsWithDetails,
    totalAmount,
    validItemsCount,
    addItem,
    removeItem,
    updateItemProduct,
    updateItemQuantity,
    reset,
  };
}
