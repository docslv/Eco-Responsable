import React, { useEffect, useState } from 'react';

import {
    Star,
    StarHalf,
    StarBorder
} from '@material-ui/icons';

import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    starIcon: {
        fontSize: '40px'
    }
}))
// notation
export default function Stars(props) {
    const classes = useStyles();

    const [fullStars, setFullStars] = useState([]);
    const [halfStar, setHalfStar] = useState([]);
    const [emptyStars, setEmptyStars] = useState([]);


    useEffect(() => {
        const roundedNote = Math.round(props.note * 2) / 2;
        const isHalf = roundedNote % 1 === 0 ? false : true;

        if (isHalf) {
            const note = roundedNote - 0.5;
            const empty = 4 - note;

            const fullStarsArray = [];
            const emptyStarsArray = [];

            for (let i = note; i > 0; i--) {
                fullStarsArray.push(<Star key={'full_' + i} className={classes.starIcon} />)
            }
            for (let k = empty; k > 0; k--) {
                emptyStarsArray.push(<StarBorder key={('empty_') + k} className={classes.starIcon} />)
            }

            setFullStars(fullStarsArray);
            setHalfStar([<StarHalf key={'half'} className={classes.starIcon} />])
            setEmptyStars(emptyStarsArray);

        } else {
            const empty = 5 - roundedNote;

            const fullStarsArray = [];
            const emptyStarsArray = [];

            for (let i = roundedNote; i > 0; i--) {
                fullStarsArray.push(<Star key={'full_' + i} className={classes.starIcon} />)
            }
            for (let k = empty; k > 0; k--) {
                emptyStarsArray.push(<StarBorder key={'empty_' + k} className={classes.starIcon} />)
            }

            setFullStars(fullStarsArray);
            setEmptyStars(emptyStarsArray);
        }
        return () => { };
    }, [props.note, classes.starIcon]);

    return (
        <div style={{ display: 'inline-block' }}>
            {fullStars}
            {halfStar}
            {emptyStars}
        </div>
    )

}