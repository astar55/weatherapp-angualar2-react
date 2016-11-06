import * as React from 'react';
import * as ReactDOM from 'react-dom'

export function datainsertion(data: string[], location: string): void {
    ReactDOM.render(<div dangerouslySetInnerHTML={{__html: data[0]}}></div>, document.querySelector(`div[name=${location}]`));
}

export function dataremove(location: string): void {
    ReactDOM.unmountComponentAtNode(document.querySelector(`div[name=${location}]`));
} 