import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('main.ts', () => {
  it('should mount the app', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })
})
