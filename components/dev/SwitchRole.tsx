import React, { useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { switchRole } from "../../redux/slices/dev"
import Select from "react-select"
import styled from "styled-components"
import { SelectOption } from "../../types/form"
import { useAppSelector, useAppDispatch } from "../../redux/hooks/app"

const options = [
  { value: "admin", label: "Admin" },
  { value: "coach", label: "Coach" },
  { value: "user", label: "User" }
]

export const SwitchRole = () => {
  const selectedRole = useAppSelector(state => state.dev.role)
  const dispatch = useAppDispatch()

  const { control, handleSubmit, watch } = useForm<{
    role: string
  }>()
  const onSubmit: SubmitHandler<SelectOption> = (data: SelectOption) => {
    dispatch(switchRole(data.value))
  }

  useEffect(() => {
    // TypeScript users
    const subscription = watch(() => handleSubmit(onSubmit)())
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  console.log("render", selectedRole)

  return (
    <Root onSubmit={handleSubmit(onSubmit)}>
      <Title>Switch role</Title>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <StyledSelect
            {...field}
            instanceId="roleSelect" // fixes hydration error
            options={options}
            menuPlacement="top"
            defaultValue={options.find(c => c.value === selectedRole)}
          />
        )}
        rules={{ required: true }}
      />
    </Root>
  )
}

const Root = styled.form`
  width: 200px;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--color-surface-mixed-200);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 10px;
`

const StyledSelect = styled(Select)`
  color: var(--color-surface-100);
`
