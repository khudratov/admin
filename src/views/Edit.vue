<template>
  <div>
    <Navbar />

    <div class="container">
      <form @submit.prevent="submitHandler">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input
              id="icon_prefix"
              type="text"
              v-model="fullname"
              :class="{
                invalid: $v.fullname.$dirty && !$v.fullname.required,
              }"
            />
            <label for="icon_prefix">Ф.И.О</label>
            <small
              v-if="$v.fullname.$dirty && !$v.fullname.required"
              class="helper-text invalid"
            >
              Введите полное имя
            </small>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              v-model="email"
              :class="{
                invalid:
                  $v.email.$dirty && (!$v.email.required || !$v.email.email),
              }"
            />
            <label for="email">Электронный адрес</label>
            <small
              v-if="$v.email.$dirty && !$v.email.required"
              class="helper-text invalid"
            >
              Введите адрес электронной почты
            </small>
            <small
              v-else-if="$v.email.$dirty && !$v.email.email"
              class="helper-text invalid"
            >
              Введите правильный адрес электронной почты
            </small>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">phone</i>
            <input
              id="tel"
              type="tel"
              v-model="tel"
              :class="{
                invalid:
                  $v.tel.$dirty && (!$v.tel.required || !$v.tel.checkNumber),
              }"
            />
            <label for="tel">Телефон</label>
            <small
              v-if="$v.tel.$dirty && !$v.tel.required"
              class="helper-text invalid"
            >
              Введите номер телефона
            </small>
            <small
              v-else-if="$v.tel.$dirty && !$v.tel.checkNumber"
              class="helper-text invalid"
            >
              Введите номер телефона в формать +7 (444) 444-44-44
            </small>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input
              id="pass"
              type="text"
              v-model="pass"
              :class="{
                invalid:
                  $v.pass.$dirty && (!$v.pass.required || !$v.pass.minLength),
              }"
            />
            <label for="pass">Пароль</label>
            <small
              v-if="$v.pass.$dirty && !$v.pass.required"
              class="helper-text invalid"
            >
              Введите пароль
            </small>
            <small
              v-else-if="$v.pass.$dirty && !$v.pass.minLength"
              class="helper-text invalid"
            >
              Минимальная длина должна быть
              {{ $v.pass.$params.minLength.min }} символов
            </small>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">equalizer</i>
            <select ref="select" v-model="status">
              <option value="Client">Client</option>
              <option value="Partner">Partner</option>
              <option value="Admin">Admin</option>
            </select>
            <label>Статус пользователя</label>
          </div>
        </div>

        <div class="buttons">
          <button class="btn red darken-1" @click.prevent="deleteUser">
            Удалить пользователя
          </button>
          <button class="btn" @submit.prevent="submitHandler">Обновить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import Navbar from "@/components/Navbar";

function checkNumber(value) {
  return /\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d/.test(value) && value.length === 18;
}

export default {
  components: {
    Navbar,
  },
  data: () => ({
    fullname: "",
    email: "",
    tel: "",
    pass: "",
    status: "",
    select: null,
  }),

  validations: {
    fullname: { required },
    email: { required, email },
    tel: { required, checkNumber },
    pass: { required, minLength: minLength(6) },
    status: { required },
  },

  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let user = users.find((c) => c.id === +this.$route.params.id);

      if (this.changed(user)) {
        const updateDate = {
          fullname: this.fullname,
          email: this.email,
          tel: this.tel,
          pass: this.pass,
          status: this.status,
          dateEdit: new Date(Date.now()).toLocaleString(),
        };

        users = users.filter((c) => c.id !== +this.$route.params.id);
        users.push({ ...user, ...updateDate });
        users = JSON.stringify(users);
        localStorage.setItem("users", users);
        this.$router.push("/?message=updated");
        return;
      }

      this.$router.push("/?message=notUpdated");
    },

    deleteUser() {
      let users = JSON.parse(localStorage.getItem("users"));
      users = users.filter((c) => c.id !== +this.$route.params.id);
      localStorage.setItem("users", JSON.stringify(users));
      this.$router.push("/?message=deleted");
    },

    changed(user) {
      return !(
        this.fullname === user.fullname &&
        this.email === user.email &&
        this.tel === user.tel &&
        this.pass === user.pass &&
        this.status === user.status
      );
    },
  },

  mounted() {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((c) => c.id === +this.$route.params.id);

    this.fullname = user.fullname;
    this.email = user.email;
    this.tel = user.tel;
    this.pass = user.pass;
    this.status = user.status;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select, {});
      M.updateTextFields();
    });
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang="scss">
.input-field > .select-wrapper {
  width: calc(100% - 3rem);
  margin-left: 3rem;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons > button {
  margin: 0 20px;
}

.mb {
  margin-bottom: 2rem;
}

.helper-text.invalid {
  color: #f44336;
}
</style>
