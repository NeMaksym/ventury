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
} from '@mui/material'
import { ClickAwayListener } from '@mui/base'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { InputWithButton, type InputWithPropsSetValue } from '@/components'

const ListStyled = styled(List)<ListProps>(({ theme }) => ({
  maxWidth: '300px',
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

interface IListItem {
  id: string
  label: string
}

interface EditableListProps {
  label: string
  items: IListItem[]
  onItemAdd: (inputValue: string, setInputValue: InputWithPropsSetValue) => void
  onItemDelete: (id: IListItem['id']) => void
  onItemEdit: (id: IListItem['id'], inputValue: string) => void
  onItemSelect: (id: IListItem['id']) => void
}

export function EditableList({
  label,
  items,
  onItemAdd,
  onItemDelete,
  onItemEdit,
  onItemSelect,
}: EditableListProps) {
  const [selectedItem, setSelectedItem] = useState('')
  const isSelected = (id: IListItem['id']) => id === selectedItem

  const [isEditMode, setIsEditMode] = useState(false)
  const idEditable = (id: IListItem['id']) => isSelected(id) && isEditMode

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
                disabled={!selectedItem || isEditMode}
                size="small"
                onClick={() => setIsEditMode(true)}
              >
                <EditIcon />
              </IconButtonStyled>
              <IconButtonStyled
                disabled={!selectedItem}
                size="small"
                onClick={() => {
                  onItemDelete(selectedItem)
                  setSelectedItem('')
                }}
              >
                <DeleteIcon />
              </IconButtonStyled>
            </Stack>
          </Stack>
        </ListSubheaderStyled>
      }
    >
      <Divider />
      {items.map(({ id, label }) => (
        <ListItemButton
          key={id}
          onClick={() => {
            setIsEditMode(false)
            setSelectedItem(id)
            onItemSelect(id)
          }}
          selected={isSelected(id)}
        >
          {idEditable(id) ? (
            <ClickAwayListener onClickAway={() => setIsEditMode(false)}>
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
                onChange={(event) => onItemEdit(id, event.target.value)}
              />
            </ClickAwayListener>
          ) : (
            <ListItemText primary={label} />
          )}
        </ListItemButton>
      ))}
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
