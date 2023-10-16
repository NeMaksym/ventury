'use client'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentProps,
  DialogTitleProps,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { BANK, STORAGE_KEY } from '@/app/consts'

const DialogTitleStyled = styled(DialogTitle)<DialogTitleProps>(() => ({
  paddingBottom: '0',
}))

const DialogContentStyled = styled(DialogContent)<DialogContentProps>(() => ({
  paddingTop: '16px !important',
  width: '300px',
}))

const validationSchema = yup.object({
  bank: yup
    .string()
    .oneOf(Object.values(BANK), 'Bank should be one of the list')
    .required('Bank is required'),
  cardNumber: yup.string().when('bank', {
    is: BANK.PRIVATE,
    then: (schema) =>
      schema
        .length(4, 'Number should be 4 digits length')
        .required('Card number is required'),
    otherwise: (schema) => schema.optional(),
  }),
  accountId: yup.string().when('bank', {
    is: BANK.MONO,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
})

interface AddSourceDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (account: Mono_Account | Pb_Account) => void
}

export function AddSourceDialog({
  open,
  onClose,
  onSubmit,
}: AddSourceDialogProps) {
  const [accounts, setAccounts] = useState<Mono_Account[]>([])

  const formik = useFormik({
    initialValues: {
      bank: BANK.PRIVATE,
      cardNumber: '',
      accountId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.bank === BANK.PRIVATE) {
        const account = { maskedPan: [`****${values.cardNumber}`] }
        return onSubmit(account)
      }

      if (values.bank === BANK.MONO) {
        const account = accounts.find((acc) => acc.id === values.accountId)
        if (!account) throw Error('Account ID is missing in accounts list')
        return onSubmit(account)
      }

      throw Error('Bank is not supported')
    },
  })

  useEffect(() => {
    const storageValue = localStorage.getItem(STORAGE_KEY.accounts)
    const accounts: Mono_Account[] = storageValue
      ? JSON.parse(storageValue)
      : []
    setAccounts(accounts)
    formik.setFieldValue('accountId', accounts[0]?.id ?? '')

    // eslint-disable-next-line react-hooks/exhaustive-deps -- must be executed once unconditionally
  }, [])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleStyled>Add source</DialogTitleStyled>
      <DialogContentStyled>
        <TextField
          select
          fullWidth
          id="bank"
          name="bank"
          label="Bank"
          value={formik.values.bank}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bank && Boolean(formik.errors.bank)}
          helperText={formik.touched.bank && formik.errors.bank}
        >
          {Object.values(BANK).map((bank) => (
            <MenuItem key={bank} value={bank}>
              {bank}
            </MenuItem>
          ))}
        </TextField>

        {formik.values.bank === BANK.PRIVATE ? (
          <TextField
            fullWidth
            margin="normal"
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            variant="outlined"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          />
        ) : (
          <TextField
            select
            fullWidth
            margin="normal"
            id="accountId"
            name="accountId"
            label="Account"
            disabled={!formik.values.accountId}
            value={formik.values.accountId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.accountId && Boolean(formik.errors.accountId)}
            helperText={formik.touched.accountId && formik.errors.accountId}
          >
            {accounts.map((acc) => (
              <MenuItem key={acc.id} value={acc.id}>
                {acc.maskedPan[0]}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContentStyled>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={formik.submitForm}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
