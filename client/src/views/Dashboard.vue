<template>
<div class="row mt-5">
 <h1 class="mt-4">Dashboard</h1>
 <br/>
<p class="lead mb-3">Welcome {{username}} </p>
<a @click="logout()" class="btn btn-secondary">Logout</a>
</div>
</template>

<script>
export default {
computed: {
      username () {
        return this.$store.state.username
      }
    },
    methods:{
        logout(){
            this.$api.get('/users/logout')
            .then((res) => {
            console.log(res.data)
            this.$store.commit('deleteUsername')
            this.$router.push('login')
            }
            )
        }
    }
}
</script>

<style>

</style>