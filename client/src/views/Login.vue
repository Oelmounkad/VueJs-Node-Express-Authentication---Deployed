<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
        
<div v-if="registerMsg" class="alert alert-success alert-dismissible fade show" role="alert">
 {{ registerMsg }}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

   <div v-if="authError" class="alert alert-warning alert-dismissible fade show" role="alert">
 {{ authError }}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> 

       
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="password"
            />
          </div>
          <button @click="login()" class="btn btn-primary btn-block">Login</button>
      
        <p class="lead mt-4">
          No Account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function () {
    return {
      authError:'',
      email: '',
      password: ''
    }
  },
computed: {
      registerMsg () {
        return this.$store.state.registerRedirect.registerMsg
      },
      registeredEmail(){
          return this.$store.state.registerRedirect.registeredEmail
      }
    },
    created(){
       this.email = this.$store.state.registerRedirect.registeredEmail
    },
    methods:{
        login(){
            this.$api.post('/users/login',{
                email:this.email,
                password:this.password
            })
            .then(res => {
               if('authErrorMessage' in res.data){
                    this.authError = res.data.authErrorMessage
                }else{
                    this.$store.commit('persistUsername',res.data.username)
                    this.$router.push('dashboard')
                }
                console.log('result is : ',res)
                })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style>

</style>