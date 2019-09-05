import * as React from 'react';

import { FieldRenderProps } from 'react-final-form';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IFieldBaseProps from './IFieldBaseProps';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

export const SelectFieldInput: React.FC<
    FieldRenderProps<string, HTMLDivElement> &
        IFieldBaseProps & { items?: { value: string; text: string }[] }
> = ({
    title,
    fullWidth,
    disabled,
    outlined,
    helperText,
    items,
    input,
    meta
}) =>
    !outlined ? (
        <FormControl fullWidth={true}>
            <InputLabel>{title}</InputLabel>
            <NativeSelect
                {...input}
                input={<Input name={input.name} />}
                fullWidth={fullWidth}
                disabled={disabled}
                error={meta.touched && meta.error !== undefined}
                onChange={(
                    event: React.ChangeEvent<{
                        name?: string;
                        value: string;
                    }>
                ) => {
                    if (input.onChange) {
                        input.onChange(event.target.value);
                    }
                }}
            >
                {items &&
                    items.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.text}
                        </option>
                    ))}
            </NativeSelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    ) : (
        <FormControl fullWidth={true}>
            <InputLabel>{title}</InputLabel>
            <NativeSelect
                {...input}
                input={<Input name={input.name} />}
                fullWidth={fullWidth}
                variant="outlined"
                disabled={disabled}
                error={meta.touched && meta.error !== undefined}
                onChange={(
                    event: React.ChangeEvent<{
                        name?: string;
                        value: string;
                    }>
                ) => {
                    if (input.onChange) {
                        input.onChange(event.target.value);
                    }
                }}
            >
                {items &&
                    items.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.text}
                        </option>
                    ))}
            </NativeSelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
