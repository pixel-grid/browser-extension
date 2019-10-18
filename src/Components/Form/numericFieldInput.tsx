import NumberFormat, { NumberFormatValues } from 'react-number-format';
import React, { FunctionComponent, useCallback } from 'react';

import FieldBaseProps from './FieldBaseProps';
import { FieldRenderProps } from 'react-final-form';
import TextField from '@material-ui/core/TextField';

export const NumericFieldInput: FunctionComponent<
    FieldRenderProps<string, HTMLInputElement> &
        FieldBaseProps & { suffix?: string }
> = ({
    title,
    fullWidth,
    disabled,
    outlined,
    helperText,
    suffix,
    input,
    meta
}) => {
    const innerInput = useCallback(
        ({ inputRef, onChange, defaultValue, ...other }) => (
            <NumberFormat
                {...input}
                {...other}
                getInputRef={inputRef}
                onChange={undefined}
                onValueChange={(values: NumberFormatValues) => {
                    if (input.onChange) {
                        input.onChange(values.floatValue);
                    }
                }}
                suffix={suffix}
            />
        ),
        [suffix]
    );

    return !outlined ? (
        <TextField
            {...input}
            label={title}
            fullWidth={fullWidth}
            disabled={disabled}
            error={meta.touched && meta.error !== undefined}
            InputProps={{
                inputComponent: innerInput
            }}
            helperText={helperText}
        />
    ) : (
        <TextField
            {...input}
            label={title}
            fullWidth={fullWidth}
            variant="outlined"
            disabled={disabled}
            error={meta.touched && meta.error !== undefined}
            InputProps={{
                inputComponent: innerInput
            }}
            helperText={helperText}
        />
    );
};
