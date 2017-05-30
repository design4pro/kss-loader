import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import schema from './schema';
import runKss from './runKss';

function kssLoader(source) {
  const options = Object.assign({}, getOptions(this), {});
  if (this.cacheable) this.cacheable();

  // Validate options
  const validation = validateOptions(schema, options, 'KSS Loader');
  if (!validation) {
    throw new Error(validation.error);
  }

  const callback = this.async();

  // Start the rendering
  runKss(source, options, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result.source);
  });
}

export default kssLoader;
