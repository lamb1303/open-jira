import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { DragEvent, FC, useContext } from "react";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const router = useRouter();
  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };
  const onDragEnd = (e: DragEvent) => {
    endDragging();
  };

  const onClick = () => {
    router.push(`entries/${entry._id}`);
  };
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{ marginBottom: 1 }}
      onClick={onClick}
    >
      <CardActionArea
      //sx={{ cursor: "grab"}}
      >
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
