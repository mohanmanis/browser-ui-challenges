/**
 * Component Registry
 * Maps component names (strings) to actual React components
 * This allows tabsConfig to come from API as plain JSON with component names
 */
import ConfigDrivenUI from '../components/ConfigDrivenUI'
import FormWithValidation from '../components/FormWithValidation'
import DocumentRenderer from '../components/DocumentRenderer'

export const componentRegistry = {
  ConfigDrivenUI,
  FormWithValidation,
  DocumentRenderer,
}
