<template>
        <v-card max-width="600px" min-width="360px" class="center">
                <v-tabs v-model="tab" show-arrows background-color="red lighten-1" icons-and-text dark grow>
                    <v-tabs-slider color="red lighten-1"></v-tabs-slider>
                    <v-tab v-for="i in tabs" :key="i.name">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="validLogin" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="formLogin.email" :rules="emailRule" name="login_email" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="formLogin.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRule" :type="show1 ? 'text' : 'password'" name="login_password" label="Password" hint="At least 6 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!validLogin" class="white--text" color="red lighten-1" @click="validate('login')"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="validRegister" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="formRegister.firstName" :rules="requiredRule" label="First Name" name="register_first_name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="formRegister.lastName" :rules="requiredRule" label="Last Name" name="register_last_name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="formRegister.email" :rules="emailRule" label="E-mail" name="register_email" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="formRegister.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRule" :type="show1 ? 'text' : 'password'" name="register_password" label="Password" hint="At least 6 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="formRegister.verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.verifyPasswordRule, matchPasswords]" :type="show1 ? 'text' : 'password'" name="verify_password" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!validRegister" class="white--text" color="red lighten-1" @click="validate('register')">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
        </v-card>
</template>

<script>
  export default {
    name: 'LoginComponent',
    computed: {
      matchPasswords() {
        return this.formRegister.password === this.formRegister.verify || "Passwords must match";
      }
    },
    methods: {
      validate(form) {
        if (form == 'login') {
          if (this.$refs.loginForm.validate()) {
            alert('LOGIN VALID')
          }  
        } else {
          if (this.$refs.registerForm.validate()) {
            alert('REGISTER VALID')
          }  
        }
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      }
    },
    data: () => ({
      tab: 0,
      tabs: [
          {name:"Login", icon:"mdi-account"},
          {name:"Register", icon:"mdi-account-outline"}
      ],
      validLogin: true,
      validRegister: true,
      show1: false,

      formLogin: {
        email: "",
        password: ""
      },
      formRegister: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verify: ""
      },
      
      
      
      emailRule: [
        v => !!v || "Please enter your E-mail",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRule: [
        v => !!v || "Please enter your password",
        v => (v && v.length >= 6) || "It has to be at least 6 characters"
      ],
      requiredRule: [
        v => !!v || "This field is required"
      ],
      rules: {
        verifyPasswordRule: value => !!value || "Please re-enter your password"
      }
    })
  }
</script>
<style scoped>
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
  }
</style>