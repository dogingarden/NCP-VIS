/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-02-13 16:34:56
 * @LastEditors  : konglingyuan
 * @LastEditTime : 2020-02-13 16:36:39
 */
/**
 * Asynchronously loads the component for HomePage
 */
import loadable from 'loadable-components'
export default loadable(() => import('./index'))
