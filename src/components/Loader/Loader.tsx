import * as React from "react";

export interface ILoaderState {}
export interface ILoaderProps {}

export class LoaderComponent extends React.PureComponent<ILoaderProps, ILoaderState> {
  state = {};

  render() {
    return (
      <div className="wrapper">
    <div className="loader-container" >
        <div className="loader">
            <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
        </div>
    </div>
</div>
    );
  }
}
