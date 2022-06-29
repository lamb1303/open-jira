import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";

interface PropsProvider {
  children: React.ReactNode;
}
export interface EntriesState {
  entries: Entry[];
}
const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};
export const EntriesProvider: FC<PropsProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });
      dispatch({ type: "[Entry] Add-Entry", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      const { data } = await entriesApi.delete(`entries/${_id}`);

      enqueueSnackbar("Entrada eliminada", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch({ type: "[Entry] Delete-Entry", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackBar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
      if (showSnackBar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
