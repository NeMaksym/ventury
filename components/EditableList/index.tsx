'use client'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  List,
  ListProps,
  ListSubheader,
  ListSubheaderProps,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  Stack,
  IconButtonProps,
  Box,
  BoxProps,
} from '@mui/material'
import { ClickAwayListener } from '@mui/base'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { InputWithButton, type InputWithPropsSetValue } from '@/components'

const ListStyled = styled(List)<ListProps>(({ theme }) => ({
  maxWidth: '350px',
  border: 'solid',
  borderRadius: '4px',
  borderColor: theme.palette.grey[300],
  ':hover': {
    borderColor: theme.palette.grey[500],
  },
}))

const ListSubheaderStyled = styled(ListSubheader)<ListSubheaderProps>(() => ({
  borderRadius: '4px',
}))

const IconButtonStyled = styled(IconButton)<IconButtonProps>(() => ({
  height: '34px',
}))

const StyledBox = styled(Box)<BoxProps>(() => ({
  height: '250px',
  overflow: 'scroll',
}))

interface IListItem {
  id: string
  label: string
}

interface EditableListProps {
  label: string
  items: IListItem[]
  onItemAdd: (inputValue: string, setInputValue: InputWithPropsSetValue) => void
  onItemDelete: () => void
  onItemEdit: (inputValue: string) => void
  selectedId: string
  onItemSelect: (id: IListItem['id']) => void
}

export function EditableList({
  label,
  items,
  onItemAdd,
  onItemDelete,
  onItemEdit,
  selectedId,
  onItemSelect,
}: EditableListProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const idEditable = (id: IListItem['id']) => id === selectedId && isEditMode

  return (
    <ListStyled
      disablePadding
      subheader={
        <ListSubheaderStyled>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {label}
            <Stack direction="row" spacing={1}>
              <IconButtonStyled
                disabled={!selectedId || isEditMode}
                size="small"
                onClick={() => setIsEditMode(true)}
              >
                <EditIcon />
              </IconButtonStyled>
              <IconButtonStyled
                disabled={!selectedId}
                size="small"
                onClick={onItemDelete}
              >
                <DeleteIcon />
              </IconButtonStyled>
            </Stack>
          </Stack>
        </ListSubheaderStyled>
      }
    >
      <Divider />
      <StyledBox>
        {items.map(({ id, label }) => (
          <ListItemButton
            key={id}
            onClick={() => onItemSelect(id)}
            selected={id === selectedId}
          >
            {idEditable(id) ? (
              <ClickAwayListener
                mouseEvent="onMouseUp"
                onClickAway={() => setIsEditMode(false)}
              >
                <TextField
                  value={label}
                  size="small"
                  variant="standard"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  inputProps={{
                    sx: { py: '4px', height: '1.5em' },
                  }}
                  inputRef={(input) => input && input.focus()}
                  onChange={(event) => onItemEdit(event.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <ListItemText primary={label} />
            )}
          </ListItemButton>
        ))}
      </StyledBox>
      <Divider />
      <ListItem>
        <InputWithButton
          fullWidth
          size="small"
          btnText="Add"
          onClick={onItemAdd}
        />
      </ListItem>
    </ListStyled>
  )
}
