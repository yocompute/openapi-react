import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ResponseSchema from './ResponseSchema';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    success: {
        backgroundColor: 'rgba(29, 129, 39, 0.1)'
    },
    error: {
        backgroundColor: 'rgba(212, 31, 28, 0.1)'
    },
}));

function Responses({ responses, definitionMap }) {
    const classes = useStyles();
    const getSchemaName = (schema) => {
        if (schema) {
            const s = schema.$ref;
            if (s) {
                return s.replace('#/definitions/', '');
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    return (
        <div className={classes.root}>
            {
                Object.keys(responses).map(code => (
                    <Accordion key={code}>
                        <AccordionSummary
                            className={code === '200' ? classes.success : classes.error}
                            expandIcon={responses[code].schema ? <ExpandMoreIcon /> : <span/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{`${code} ${responses[code].description}`}</Typography>
                        </AccordionSummary>
                        {
                            responses[code].schema &&
                            <AccordionDetails>
                                <Typography>
                                    <ResponseSchema schemaName={getSchemaName(responses[code].schema)} definitionMap={definitionMap} />
                                </Typography>
                            </AccordionDetails>
                        }
                    </Accordion>
                ))
            }
        </div>
    );
}

export default Responses;