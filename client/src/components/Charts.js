import React from 'react';
import ChartsDisplay from './ChartsDisplay';

export default class Charts extends React.Component {
    state = {}

    generateDataForMonthStats = data => {
        const val = [];

        data && Object.entries(data).map(([key, value]) => {
            Object.entries(value).map(([innerKey, innerValue]) => {
                return (
                    val.push({date: this.props.translations.months[parseInt(innerKey - 1)] + ', ' + key,
                        value: this.props.calculateMonthTotalPages(innerKey, innerValue)})
                )
            })

        })
        return val;
    }

    generateDataForDayStats = data => {
        const val = [];
        data && Object.entries(data).map(([key, value]) => {
            Object.entries(value).map(([innerKey, innerValue]) => {
                Object.entries(innerValue).map(([nKey, nValue]) => {
                    return (
                        val.push({date: nKey,
                            value: this.props.calculateTotal(nValue, 'pages')})
                    )
                })
            })
        })

        return val;
    }

    render() {
        return (
            <div>
                <ChartsDisplay
                    data={this.generateDataForMonthStats(this.props.data)}
                    title="Pages per month"
                />
                <ChartsDisplay
                    data={this.generateDataForDayStats(this.props.data)}
                    title="Pages per day"
                />
            </div>
        )
    }
}