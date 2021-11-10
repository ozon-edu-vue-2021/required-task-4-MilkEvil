<template>
  <form @submit.prevent="sendForm" class="form">
    <div class="h4">Личные данные</div>
    <div class="row">
      <div class="col-4">
        <custom-input
            id="surname"
            label="Фамилия"
            v-model.trim="personal.surname"
            :is-invalid="!!errors.surname"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.surname">{{ errors.surname }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-4">
        <custom-input
            id="name"
            label="Имя"
            v-model.trim="personal.name"
            :is-invalid="!!errors.name"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.name">{{ errors.name }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-4">
        <custom-input
            id="patronymic"
            label="Отчество"
            v-model.trim="personal.patronymic"
            :is-invalid="!!errors.patronymic"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.patronymic">{{ errors.patronymic }}</div>
          </template>
        </custom-input>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <custom-input
            id="birthday"
            label="Дата рождения"
            placeholder="дд.мм.гггг"
            mask="##.##.####"
            v-model.trim="personal.birthday"
            :is-invalid="!!errors.birthday"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.birthday">{{ errors.birthday }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-6">
        <custom-input
            id="email"
            label="E-mail"
            type="email"
            v-model.trim="personal.email"
            :is-invalid="!!errors.email"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.email">{{ errors.email }}</div>
          </template>
        </custom-input>
      </div>
    </div>
    <div class="h6 mt-3">Пол:</div>
    <div class="row">
      <div class="col-6">
        <custom-radio
            id="sex-male"
            name="sex"
            value="male"
            :current-value="personal.sex"
            label="Мужской"
            @change="changeSex($event)"
        />
        <custom-radio
            id="sex-female"
            name="sex"
            value="female"
            :current-value="personal.sex"
            label="Женский"
            @change="changeSex($event)"
        />
      </div>
    </div>
    <div class="h4 mt-4">Паспортные данные:</div>
    <div class="mb-3">
      <custom-dropdown
          id="citizen-ships"
          label="Гражданство"
          :options="citizenShips"
          v-model.trim="passport.citizenship"
          :is-invalid="!!errors.citizenship"
      >
        <template #errorMessage>
          <div class="invalid-feedback" v-if="!!errors.citizenship">{{ errors.citizenship }}</div>
        </template>
      </custom-dropdown>
    </div>
    <div class="row" v-if="fromRussia">
      <div class="col-4">
        <custom-input
            id="series"
            type="number"
            label="Серия"
            mask="####"
            v-model.trim="passport.series"
            :is-invalid="!!errors.series"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.series">{{ errors.series }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-4">
        <custom-input
            id="number"
            type="number"
            label="Номер"
            mask="######"
            v-model.trim="passport.number"
            :is-invalid="!!errors.number"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.number">{{ errors.number }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-4">
        <custom-input
            id="date"
            label="Дата выдачи"
            placeholder="дд.мм.гггг"
            mask="##.##.####"
            v-model.trim="passport.date"
            :is-invalid="!!errors.date"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.date">{{ errors.date }}</div>
          </template>
        </custom-input>
      </div>
    </div>
    <div class="row" v-if="!fromRussia && !!passport.citizenship">
      <div class="col-6">
        <custom-input
            id="surname-latin"
            label="Фамилия на латинице"
            v-model.trim="passport.surname"
            :is-invalid="!!errors.surnameLatin"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.surnameLatin">{{ errors.surnameLatin }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-6">
        <custom-input
            id="name-latin"
            label="Имя на латинице"
            v-model.trim="passport.name"
            :is-invalid="!!errors.nameLatin"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.nameLatin">{{ errors.nameLatin }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-4">
        <custom-input
            id="passport-id"
            type="number"
            label="Номер паспорта"
            v-model="passport.passportID"
            :is-invalid="!!errors.passportID"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.passportID">{{ errors.passportID }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-4">
        <custom-select
            id="country"
            label="Страна выдачи"
            :options="citizenShips"
            v-model.trim="passport.country"
            :is-invalid="!!errors.country"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.country">{{ errors.country }}</div>
          </template>
        </custom-select>
      </div>
      <div class="col-4">
        <custom-select
            id="type"
            label="Тип паспорта"
            :options="passportTypes"
            v-model.trim="passport.type"
            :is-invalid="!!errors.type"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.type">{{ errors.type }}</div>
          </template>
        </custom-select>
      </div>
    </div>
    <div class="h6 mt-4">Меняли ли фамилию или имя?</div>
    <div class="row">
      <div class="col-6">
        <custom-radio
            id="change-no"
            name="change"
            value="no"
            :current-value="passport.changeName"
            label="Нет"
            @change="changeName($event)"
        />
        <custom-radio
            id="change-yes"
            name="change"
            value="yes"
            :current-value="passport.changeName"
            label="Да"
            @change="changeName($event)"
        />
      </div>
    </div>
    <div class="row mt-3" v-if="changedName">
      <div class="col-6">
        <custom-input
            id="old-surname"
            label="Предыдущая Фамилия"
            v-model.trim="passport.oldSurname"
            :is-invalid="!!errors.oldSurname"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.oldSurname">{{ errors.oldSurname }}</div>
          </template>
        </custom-input>
      </div>
      <div class="col-6">
        <custom-input
            id="old-name"
            label="Предыдущее Имя"
            v-model.trim="passport.oldName"
            :is-invalid="!!errors.oldName"
        >
          <template #errorMessage>
            <div class="invalid-feedback" v-if="!!errors.oldName">{{ errors.oldName }}</div>
          </template>
        </custom-input>
      </div>
    </div>
    <div class="mt-4 text-center h3 text-success" v-if="sent">Кредит на ваши данные успешно оформлен</div>
    <button
        class="w-100 btn btn-primary btn-lg mt-4"
        type="submit"
        :disabled="isLoading"
    >
      <template v-if="isLoading">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Отправляем...
      </template>
      <template v-else>Отправить</template>
    </button>
  </form>
</template>

<script>
import { validation } from "@/helpers/validation";

import citizenShips from '@/assets/data/citizenships.json';
import passportTypes from '@/assets/data/passport-types.json';
import CustomInput from '@/components/CustomInput';
import CustomRadio from "@/components/CustomRadio";
import CustomSelect from "@/components/CustomSelect";
import CustomDropdown from "@/components/CustomDropdown";

export default {
  name: 'Form',
  components: {
    CustomInput,
    CustomRadio,
    CustomSelect,
    CustomDropdown,
  },
  data() {
    return {
      isLoading: false,
      sent: false,
      citizenShips: [],
      passportTypes: [],
      errors: {},
      personal: {
        surname: '',
        name: '',
        patronymic: '',
        birthday: '',
        email: '',
        sex: 'male',
      },
      passport: {
        citizenship: '',
        series: '',
        number: '',
        date: '',
        surname: '',
        name: '',
        passportID: '',
        country: '',
        type: '',
        changeName: 'no',
        oldSurname: '',
        oldName: '',
      }
    }
  },
  created() {
    this.citizenShips = this.convertCountry(citizenShips);
    this.passportTypes = this.convertPassportTypes(passportTypes);
  },
  computed: {
    changedName() {
      return this.passport.changeName === 'yes';
    },
    fromRussia() {
      // Ещё по хорошему бы чтоб с бэка приходил какой то флаг, а не по id проверку делать
      return this.passport.citizenship === 8604;
    }
  },
  methods: {
    changeSex(sex) {
      this.personal.sex = sex;
    },
    changeName(change) {
      this.passport.changeName = change;
    },
    validation() {
      this.errors = {};

      this.errors.surname = validation.required(this.personal.surname) || validation.ruWord(this.personal.surname);
      this.errors.name = validation.required(this.personal.name) || validation.ruWord(this.personal.name);
      this.errors.patronymic = validation.required(this.personal.patronymic) || validation.ruWord(this.personal.patronymic);
      this.errors.birthday = validation.required(this.personal.birthday) || validation.date(this.personal.birthday);
      this.errors.email = validation.required(this.personal.email) || validation.email(this.personal.email);
      this.errors.citizenship = validation.required(this.passport.citizenship);

      if (this.fromRussia) {
        this.errors.series = validation.currentLength(this.passport.series, 4);
        this.errors.number = validation.currentLength(this.passport.number, 6);
        this.errors.date = validation.date(this.passport.date);
      }

      if (!this.fromRussia && !!this.passport.citizenship) {
        this.errors.surnameLatin = validation.required(this.passport.surname) || validation.enWord(this.passport.surname);
        this.errors.nameLatin = validation.required(this.passport.name) || validation.enWord(this.passport.name);
        this.errors.passportID = validation.required(this.passport.passportID);
        this.errors.country = validation.required(this.passport.country);
        this.errors.type = validation.required(this.passport.type);
      }

      if (this.changedName) {
        this.errors.oldSurname = validation.required(this.passport.oldSurname) || validation.ruWord(this.passport.oldSurname);
        this.errors.oldName = validation.required(this.passport.oldName) || validation.ruWord(this.passport.oldName);
      }
    },
    async sendForm() {
      await this.validation();
      if (Object.values(this.errors).some(field => !!field))
        return;

      this.isLoading = true;

      const personal = this.personal;
      const passport = this.passport;
      const userInfo = {...{}, personal, passport}

      setTimeout(() => {
        this.isLoading = false;
        this.sent = true;
        console.log(JSON.stringify(userInfo));

        for (let key in this.personal) {
          this.personal[key] = '';
        }
        for (let key in this.passport) {
          this.passport[key] = '';
        }
      }, 1000)
    },
    convertPassportTypes(types) {
      return types.reduce((acc, item) => {
        const type = {
          id: item.id,
          label: item.type
        };

        return [...acc, type]
      }, [])
    },
    convertCountry(countries) {
      return countries.reduce((acc, item) => {
        const country = {
          id: item.id,
          label: item.nationality
        };

        return [...acc, country]
      }, [])
    }
  },
}
</script>