<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3">
          <i class="fas fa-user-plus"></i> Register
        </h1>

<div v-for="error in errors" :key="error.id">
   <div v-if="error" class="alert alert-warning alert-dismissible fade show" role="alert">
 {{ error.msg }}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> 
</div>


          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              class="form-control"
              placeholder="Enter Name"
              v-model="name"
            />
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
              placeholder="Create Password"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              class="form-control"
              placeholder="Confirm Password"
              v-model="password2"
            />
          </div>
          <button @click="register()" class="btn btn-primary btn-block">
            Register
          </button>
        <p class="lead mt-4">Have An Account? <a href="/login">Login</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

 data: function () {
    return {
        errors:[],
            name:'',
            email:'',
            password:'',
            password2:''
    }
  },
methods:{
      register(){
        this.$api.post('/users/register',{
        name:this.name,
        email:this.email,
        password:this.password,
        password2:this.password2

    }).then(res => {
       console.log('Res is : ', res.data) 
      if('errors' in res.data) {
          this.errors.push(...res.data.errors)
          }else{
              let regMsg = {
                  msg:res.data.msg,
                  email:res.data.user.email
              }
              this.$store.commit('persistRegisterData',regMsg)
              this.$router.push('login')
          }

     
    })
    .catch(err => console.log(err))
    
    }
}

}
</script>

<style>

</style>