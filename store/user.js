export const state = () => ({
    passwordDrawer: false,
    usernameDrawer: false
})

export const mutations = {
    openPasswordDrawer(state) {
        state.passwordDrawer = true;
    },
    closePasswordDrawer(state) {
        state.passwordDrawer = false;
    },
    openUsernameDrawer(state) {
        state.usernameDrawer = true;
    },
    closeUsernameDrawer(state) {
        state.usernameDrawer = false;
    }
}