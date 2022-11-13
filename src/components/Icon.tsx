import { defineComponent, h } from 'vue';

export default defineComponent({
  render() {
    if (!this.$slots.default) return;
    return <i class={this.$slots.default()[0].children}></i>;
  },
});
