import {
  Stack,
  List,
  ListProps,
  ListSubheader,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  IconButtonProps,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddCardIcon from '@mui/icons-material/AddCard'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import PaymentsIcon from '@mui/icons-material/Payments'

const ListStyled = styled(List)<ListProps>(({ theme }) => ({
  minWidth: '200px',
  border: 'solid',
  borderRadius: '4px',
  borderColor: theme.palette.grey[300],
  ':hover': {
    borderColor: theme.palette.grey[500],
  },
}))

const IconButtonStyled = styled(IconButton)<IconButtonProps>(() => ({
  height: '34px',
}))

export const SOURCES_MOCK = [
  { value: crypto.randomUUID(), label: '**** 1234' },
  { value: crypto.randomUUID(), label: '**** 0987' },
  { value: crypto.randomUUID(), label: 'Cash' },
]

interface SourceListProps {
  value: string
  onAddSource: () => void
  onChange: (value: string) => void
}

export function SourceList({ value, onAddSource, onChange }: SourceListProps) {
  return (
    <ListStyled
      disablePadding
      subheader={
        <ListSubheader>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            Sources
            <IconButtonStyled size="small" onClick={onAddSource}>
              <AddCardIcon />
            </IconButtonStyled>
          </Stack>
        </ListSubheader>
      }
    >
      <Divider />
      {SOURCES_MOCK.map((src) => (
        <ListItemButton
          key={src.value}
          selected={src.value === value}
          onClick={() => onChange(src.value)}
        >
          <ListItemIcon>
            {src.label === 'Cash' ? <PaymentsIcon /> : <CreditCardIcon />}
          </ListItemIcon>
          <ListItemText>{src.label}</ListItemText>
        </ListItemButton>
      ))}
    </ListStyled>
  )
}
