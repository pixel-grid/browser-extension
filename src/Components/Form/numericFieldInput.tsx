import * as React from 'react';

import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { FieldRenderProps } from 'react-final-form';
import IFieldBaseProps from './IFieldBaseProps';
import TextField from '@material-ui/core/TextField';

export const NumericFieldInput: React.FC<
    FieldRenderProps<string, HTMLInputElement> &
        IFieldBaseProps & { suffix?: string }
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
    const innerInput = React.useCallback(
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
