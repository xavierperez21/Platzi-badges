import React from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgesList.css'
import twitter_logo from '../images/twitter.svg'
import Gravatar from './Gravatar';

class BadgesListItem extends React.Component {
    render() {
        return (
            <div className="BadgesListItem">
                <Gravatar
                    className="BadgesListItem__avatar"
                    email={this.props.badge.email}
                />

                <div>
                    <strong>
                        {this.props.badge.firstName} {this.props.badge.lastName}
                    </strong>
                    <br /><img className="twitter_logo" src={twitter_logo} alt=""/><span className="twitter_user">@{this.props.badge.twitter}</span>
                    <br />
                    {this.props.badge.jobTitle}
                </div>
            </div>
        );
    }
}

//Custom Hook made with basic hooks like useState
function useSearchBadges(badges) {
    const [query, setQuery] = React.useState('');
    const [filteredBadges, setFilteredBadges] = React.useState(badges);

    React.useMemo( () => {
        const result = badges.filter( badge => {
            return `${badge.firstName} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
        })

        setFilteredBadges(result);

    }, [ badges , query ]);

    return [ query, setQuery, filteredBadges ];
}

// Functional Component
function BadgesList (props) {
    const badges = props.badges;

    const [ query, setQuery, filteredBadges ] = useSearchBadges(badges)

    const reverseBadges = [...filteredBadges].reverse();

    if (filteredBadges.length === 0) {
        return (
            <div>
                <div className="form-group">
                    <label>Filter Badges</label>
                    <input type="text" className="form-control"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                    />
                </div>
                <h3>No badges were found :(</h3>
                <Link className="btn btn-primary" to="/badges/new">
                    Create new badge
                </Link>
            </div>
        )
    }

    return (
        <div className="BadgesList">
            <div className="form-group">
                <label>Filter Badges</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search a badge..."
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                />
            </div>
            <ul className="list-unstyled">
                {reverseBadges.map(badge => {
                    return (
                        <li key={badge.id}>
                            <Link className="text-reset text-decoration-none" to={`/badges/${badge.id}`}>
                                <BadgesListItem badge={badge} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default BadgesList;
