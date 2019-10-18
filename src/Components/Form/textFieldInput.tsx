import React, { FunctionComponent } from 'react';

import FieldBaseProps from './FieldBaseProps';
import { FieldRenderProps } from 'react-final-form';
import TextField from '@material-ui/core/TextField';

export const TextFieldInput: FunctionComponent<
    FieldRenderProps<string, HTMLInputElement> & FieldBaseProps
> = ({ title, fullWidth, disabled, outlined, helperText, input, meta }) =>
    !outlined ? (
        <TextField
            {...input}
            label={title}
            fullWidth={fullWidth}
            disabled={disabled}
            error={meta.touched && meta.error !== undefined}
            helperText={helperText}
            onChange={input.onChange}
        />
    ) : (
        <TextField
            {...input}
            label={title}
            fullWidth={fullWidth}
            variant="outlined"
            disabled={disabled}
            error={meta.touched && meta.error !== undefined}
            helperText={helperText}
            onChange={input.onChange}
        />
    );
