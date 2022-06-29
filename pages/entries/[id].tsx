import React, { ChangeEvent, useState, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { EntryStatus, Entry } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface EntryPageProps {
  entry: Entry;
}

export const EntryPage: FC<EntryPageProps> = ({ entry }) => {
  const [inputValue, setInputValue] = useState<string>(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState<boolean>(false);
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const router = useRouter();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeRadioValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
  };

  const onDelete = async () => {
    await deleteEntry(entry._id);

    router.reload();
  };
  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid justifyContent="center" sx={{ marginTop: 2 }} container>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada: "
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label="Nueva Entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onChangeInputValue}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup row onChange={onChangeRadioValue} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAltOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        onClick={onDelete}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};
