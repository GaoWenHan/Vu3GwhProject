import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders message', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Vue 3 + TypeScript + Webpack')
  })
})
