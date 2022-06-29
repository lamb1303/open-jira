import { List, Paper } from "@mui/material";
import React, { FC, useContext, useMemo, DragEvent } from "react";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (e: DragEvent) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px",
          "&::-webkit-scrollbar": {
            width: "0.1em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 3px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: "all 0.3s",
          }}
        >
          {entriesByStatus.map((entry, index: number) => (
            <EntryCard key={index} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
