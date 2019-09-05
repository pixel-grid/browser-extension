import * as React from 'react';

import { FieldRenderProps } from 'react-final-form';
import IFieldBaseProps from './IFieldBaseProps';
import TextField from '@material-ui/core/TextField';

export const TextFieldInput: React.FC<
    FieldRenderProps<string, HTMLInputElement> & IFieldBaseProps
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
