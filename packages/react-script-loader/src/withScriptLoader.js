import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const cachedScripts = [];

const getDisplayName = name => `withScriptLoader(${name})`;

const withScriptLoader = (...scripts) => WrappedComponent => {
  class ScriptLoader extends Component {
    constructor(props) {
      super(props);

      this._isMounted = false;

      this.state = {
        hasScriptsLoaded: false,
        hasScriptsLoadedSuccessfully: false,
      };
    }

    componentDidMount() {
      this._isMounted = true;
      this.loadScripts(scripts);
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    loadScripts = scripts => {
      const promises = scripts
        .map(script => (typeof script === 'object' ? script : { src: script }))
        .filter(script => !cachedScripts.includes(script.src))
        .map(script => this.loadScript(script));

      Promise.all(promises)
        .then(() => {
          this._isMounted &&
            this.setState({
              hasScriptsLoaded: true,
              hasScriptsLoadedSuccessfully: true,
            });
        })
        .catch(() => {
          this._isMounted &&
            this.setState({
              hasScriptsLoaded: true,
              hasScriptsLoadedSuccessfully: false,
            });
        });
    };

    loadScript = ({ src, ...attributes }) => {
      cachedScripts.push(src);

      const script = document.createElement('script');
      script.src = src;
      Object.keys(attributes).forEach(key => (script[key] = attributes[key]));

      const promise = new Promise((resolve, reject) => {
        script.addEventListener('load', () => resolve(src));
        script.addEventListener('error', error => reject(error));
      }).catch(error => {
        const index = cachedScripts.indexOf(src);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();
        throw error;
      });

      document.body.appendChild(script);

      return promise;
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  ScriptLoader.displayName = getDisplayName(name);
  ScriptLoader.WrappedComponent = WrappedComponent;

  return hoistStatics(ScriptLoader, WrappedComponent);
};

export default withScriptLoader;
