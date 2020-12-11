<template>
  <div id="app">
    <v-app id="inspire" style="background:light-blue lighten-2">
      <v-toolbar color="cyan darken-1">
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-if="!bool_login"
            @click="v_login = true"
            color="cyan darken-1"
            >Iniciar Sesión</v-btn
          >

          <!-- Ventana iniciar sesión -->
          <v-dialog v-model="v_login" max-width="550px" persistent>
            <v-card>
              <v-card-title>
                <span class="headline">Iniciar sesión</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <!-- Usuario -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-if="!bool_login"
                        prepend-icon="mdi-account-circle"
                        name="login"
                        label="Usuario"
                        type="text"
                        min="6"
                        v-model="user"
                        v-on:keyup.enter="login"
                      >
                      </v-text-field>
                    </v-flex>

                    <!-- Contraseña -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-if="!bool_login"
                        v-model="password"
                        prepend-icon="mdi-lock"
                        name="password"
                        label="Contraseña"
                        id="password"
                        min="8"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        v-on:keyup.enter="login"
                        @click:append="show1 = !show1"
                      >
                      </v-text-field>
                      <v-text-field
                        v-if="bool_login"
                        v-model="user"
                        readonly
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <!-- Botón iniciar sesión -->
                <v-btn v-if="!bool_login" @click="login" color="cyan darken-1"
                  >Iniciar Sesión</v-btn
                >

                <!-- Botón de cerrar la ventana -->
                <v-btn color="cyan darken-1" text @click="cerrar_login"
                  >Cerrar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider vertical></v-divider>

          <v-btn
            v-if="!bool_login"
            @click="v_register = true"
            color="cyan darken-1"
            light
            >Registrarse</v-btn
          >

          <!-- Ventana registro -->
          <v-dialog v-model="v_register" max-width="550px" persistent>
            <v-card>
              <v-card-title>
                <span class="headline">Registro</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <!-- Usuario -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        prepend-icon="mdi-account-circle"
                        v-model="user_register"
                        label="Usuario"
                        type="text"
                        v-on:keyup.enter="registrar"
                      >
                      </v-text-field>
                    </v-flex>

                    <!-- Contraseña -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        prepend-icon="mdi-lock"
                        v-model="pass_registrar"
                        label="Contraseña"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        v-on:keyup.enter="registrar"
                        @click:append="show2 = !show2"
                      >
                      </v-text-field>
                    </v-flex>

                    <!-- Nombre -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        prepend-icon="mdi-account"
                        v-model="name_register"
                        label="Nombre"
                        type="text"
                        min="1"
                        v-on:keyup.enter="registrar"
                      >
                      </v-text-field>
                    </v-flex>

                    <!-- Año de nacimiento-->
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        prepend-icon="mdi-calendar"
                        v-model="nacimiento_registrar"
                        type="number"
                        label="Año Nacimiento"
                        v-on:keyup.enter="registrar"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <!-- Botón registro -->
                <v-btn color="cyan darken-1" text @click="registrar"
                  >Registrarse</v-btn
                >

                <!-- Botón cerrar registro -->
                <v-btn color="cyan darken-1" text @click="cerrar_registrar"
                  >Cerrar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Boton de cerrar sesión -->
          <v-tooltip v-if="bool_login" v-model="tooltip" bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon c @click="cerrar_sesion" dark v-on="on">
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </template>
            <span>Cerrar Sesión</span>
          </v-tooltip>

          <v-divider vertical></v-divider>
        </v-toolbar-items>
      </v-toolbar>
       
       <!-- A partir de aquí es la segunda página -->
      <v-snackbar
        v-model="snackbarUsuario"
        :timeout="timeout"
        color="#cyan darken-1"
        center
      >
        {{ text }}
        <v-btn color="#cyan darken-1" text @click="snackbarUsuario = false">
          Close
        </v-btn>
      </v-snackbar>

      <v-content v-if="!bool_login">
        <img
          src="../assets/logoNyteLeon.jpg"
          height="700px"
          position="center"
        />
      </v-content>

      <v-content v-if="bool_login">
        <v-layout justify-space-around
          ><img
            src="../assets/logoNyteLeon.jpg"
            height="800px"
            position="center"
        /></v-layout>

        <v-layout justify-center align-start>
          <v-card height="100px" width="550px"
            ><v-spacer></v-spacer>
            <v-toolbar color="#cyan darken-1" height="100px" width="1110px">
              <v-btn
                color="#cyan darken-1"
                @click="
                  (caracActividad = true), (aleatorio = false), (array = [])
                "
                >Actividad por características</v-btn
              >
              <v-btn color="#cyan darken-1" @click="actividadAzar"
                >Actividad al azar</v-btn
              >
            </v-toolbar>
          </v-card>
        </v-layout>

        <!-- Opciones para escoger actividad -->
        <v-content v-if="caracActividad">
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-layout wrap text-center align-center justify-center>
                <v-card height="400px" width="750px" color="#cyan darken-1">
                  <v-toolbar
                    height="400px"
                    width="750px"
                    color="#cyan darken-1"
                  >
                   <v-col>
                    <v-toolbar-title>
                      <v-select
                        outlined
                        v-model="entor"
                        :items="entornos"
                        menu-props="auto"
                        label="Entorno"
                        hide-details
                      ></v-select> </v-toolbar-title
                    ><v-spacer></v-spacer>

                    <v-toolbar-title>
                      <v-select
                        outlined
                        v-model="modali"
                        :items="modalidades"
                        menu-props="auto"
                        label="Modalidad"
                        hide-details
                      ></v-select> </v-toolbar-title
                    ><v-spacer></v-spacer>

                    <v-toolbar-title>
                      <v-select
                        outlined
                        v-model="prec"
                        :items="precios"
                        menu-props="auto"
                        label="Precio"
                        hide-details
                      ></v-select> </v-toolbar-title
                    ><v-spacer></v-spacer>

                    <v-toolbar-title>
                      <v-select
                        outlined
                        v-model="locali"
                        :items="localizaciones"
                        menu-props="auto"
                        label="Localización"
                        hide-details
                      ></v-select> </v-toolbar-title
                    ><v-spacer></v-spacer>

                    <v-toolbar-title>
                      <v-select
                        outlined
                        v-model="afis"
                        :items="actividadesFisicas"
                        menu-props="auto"
                        label="Actividad Física"
                        hide-details
                      ></v-select> </v-toolbar-title
                    ><v-spacer></v-spacer>
                     </v-col>

                    <v-col>
                      <v-toolbar-title>
                        <v-btn
                          color="#cyan darken-1"
                          @click="buscarActividadCaracteristicas"
                          >Buscar actividad</v-btn
                        >
                      </v-toolbar-title>
                    </v-col>
                  </v-toolbar>
                </v-card>
              </v-layout>
            </v-row>
          </v-container>

          <!-- Fotos para ir con las actividades -->
          <v-container grid-list-md text-xs-center fluid pa-12>
            <v-layout row wrap fill-height fill-width>
              <v-flex v-for="(item, index) in array" v-bind:key="index">
                <v-card class="mx-auto" max-width="900">
                 <v-img
                    v-if="item.nombre === 'Visitar la catedral de León'"
                    src="../assets/2.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar la Basílica de San Isidoro'
                    "
                    src="../assets/1.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar la Casa Botines de Gaudí'
                    "
                    src="../assets/3.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar el Palacio de los Guzmanes'
                    "
                    src="../assets/5.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Convento San Marcos'"
                    src="../assets/4.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar el Palacio Conde Luna'"
                    src="../assets/6.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar el centro de León'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al museo MUSAC'"
                    src="../assets/8.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al museo de León'"
                    src="../assets/9.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Ir al museo de la fauna salvaje'
                    "
                    src="../assets/10.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Pasear por el parque de la Candamia'
                    "
                    src="../assets/11.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Correr por el parque de la Candamia'
                    "
                    src="../assets/11.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Pasear en bici por el parque de la Candamia'
                    "
                    src="../assets/11.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Pasear por el parque La Granja'"
                    src="../assets/12.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Correr por el parque La Granja'"
                    src="../assets/12.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Pasear en bici por el parque La Granja'
                    "
                    src="../assets/12.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer deporte en exteriores'"
                    src="../assets/13.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer deporte en casa'"
                    src="../assets/13.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer la ruta de las Zancas'"
                    src="../assets/14.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Ir al parque acuático Isla León'
                    "
                    src="../assets/15.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer una cata de vinos'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al cine'"
                    src="../assets/17.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a mirar un partido'"
                    src="../assets/16.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al centro comercial'"
                    src="../assets/18.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Tomar el sol'"
                    src="../assets/19.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Jugar a juegos de mesa'"
                    src="../assets/20.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a los karts'"
                    src="../assets/21.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer voluntariado'"
                    src="../assets/22.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al laser tag'"
                    src="../assets/23.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Volar una cometa'"
                    src="../assets/24.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Leer un libro'"
                    src="../assets/25.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Escuchar música o un podcast'"
                    src="../assets/26.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Cocinar'"
                    src="../assets/27.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Mirar la tele, Netflix, …'"
                    src="../assets/28.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Tocar algún instrumento o aprender a hacerlo'
                    "
                    src="../assets/29.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Aprender un nuevo idioma o un lenguaje de programación'
                    "
                    src="../assets/30.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Organizar, ordenar o limpiar la casa'
                    "
                    src="../assets/31.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer manualidades'"
                    src="../assets/32.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Pintar'"
                    src="../assets/33.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Hacer una visita virtual a un museo'
                    "
                    src="../assets/34.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Jugar a un videojuego'"
                    src="../assets/35.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer un puzle'"
                    src="../assets/36.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Hacer una videollamada con amigos o familiares'
                    "
                    src="../assets/37.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer un curso online'"
                    src="../assets/38.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Mirar las estrellas'"
                    src="../assets/39.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a una cafetería'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir de tapas'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a un restaurante'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al gimnasio'"
                    src="../assets/40.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Astorga'"
                    src="../assets/41.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar las Médulas'"
                    src="../assets/42.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ponferrada'"
                    src="../assets/43.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar la cueva de Valporquero'
                    "
                    src="../assets/44.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Riaño'"
                    src="../assets/45.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Babia'"
                    src="../assets/46.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar las Tuerces'"
                    src="../assets/47.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Pedraza'"
                    src="../assets/48.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar La Alberca'"
                    src="../assets/49.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar el parque de los Picos de Europa'
                    "
                    src="../assets/50.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Soria'"
                    src="../assets/51.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Puebla de Sanabria'"
                    src="../assets/52.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Segovia'"
                    src="../assets/53.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Arribes del Duero'"
                    src="../assets/54.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar las cascadas de Burgos'"
                    src="../assets/55.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Valladolid'"
                    src="../assets/56.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Candelario'"
                    src="../assets/57.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ciudad Rodrigo'"
                    src="../assets/58.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Mogarraz'"
                    src="../assets/59.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Penalba de Santiago'"
                    src="../assets/60.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Sepúlveda'"
                    src="../assets/61.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ayllon'"
                    src="../assets/62.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Maderuelo'"
                    src="../assets/63.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ureña'"
                    src="../assets/64.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Frias'"
                    src="../assets/65.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Medinaceli'"
                    src="../assets/66.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Covarrubias'"
                    src="../assets/67.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Vinuesa'"
                    src="../assets/68.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ledesma'"
                    src="../assets/69.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Lerma'"
                    src="../assets/70.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Miranda del Castañar'"
                    src="../assets/71.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Yanguas'"
                    src="../assets/72.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Caleruega'"
                    src="../assets/73.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar Castrillo de los Polvazares'
                    "
                    src="../assets/74.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar Monteagudo de las Vicarias'
                    "
                    src="../assets/75.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Bonilla de la Sierra'"
                    src="../assets/76.jpg"
                    height="400px"
                  ></v-img>

                  <v-img v-else src="../assets/2.jpg" height="400px"></v-img>
                  
                  <v-card-title>{{ item.nombre }}</v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- Aquí va lo de crear las cards -->
        </v-content>

        <v-content v-if="aleatorio">
          <v-container grid-list-md text-xs-center fluid pa-12>
            <v-layout row wrap fill-height fill-width>
              <v-flex v-for="(item, index) in array" v-bind:key="index">
                <v-card class="mx-auto" max-width="900">
                  <v-img
                    v-if="item.nombre === 'Visitar la catedral de León'"
                    src="../assets/2.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar la Basílica de San Isidoro'
                    "
                    src="../assets/1.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar la Casa Botines de Gaudí'
                    "
                    src="../assets/3.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar el Palacio de los Guzmanes'
                    "
                    src="../assets/5.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Convento San Marcos'"
                    src="../assets/4.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar el Palacio Conde Luna'"
                    src="../assets/6.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar el centro de León'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al museo MUSAC'"
                    src="../assets/8.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al museo de León'"
                    src="../assets/9.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Ir al museo de la fauna salvaje'
                    "
                    src="../assets/10.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Pasear por el parque de la Candamia'
                    "
                    src="../assets/11.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Correr por el parque de la Candamia'
                    "
                    src="../assets/11.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Pasear en bici por el parque de la Candamia'
                    "
                    src="../assets/11.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Pasear por el parque La Granja'"
                    src="../assets/12.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Correr por el parque La Granja'"
                    src="../assets/12.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Pasear en bici por el parque La Granja'
                    "
                    src="../assets/12.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer deporte en exteriores'"
                    src="../assets/13.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer deporte en casa'"
                    src="../assets/13.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer la ruta de las Zancas'"
                    src="../assets/14.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Ir al parque acuático Isla León'
                    "
                    src="../assets/15.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer una cata de vinos'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al cine'"
                    src="../assets/17.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a mirar un partido'"
                    src="../assets/16.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al centro comercial'"
                    src="../assets/18.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Tomar el sol'"
                    src="../assets/19.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Jugar a juegos de mesa'"
                    src="../assets/20.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a los karts'"
                    src="../assets/21.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer voluntariado'"
                    src="../assets/22.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al laser tag'"
                    src="../assets/23.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Volar una cometa'"
                    src="../assets/24.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Leer un libro'"
                    src="../assets/25.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Escuchar música o un podcast'"
                    src="../assets/26.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Cocinar'"
                    src="../assets/27.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Mirar la tele, Netflix, …'"
                    src="../assets/28.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Tocar algún instrumento o aprender a hacerlo'
                    "
                    src="../assets/29.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Aprender un nuevo idioma o un lenguaje de programación'
                    "
                    src="../assets/30.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Organizar, ordenar o limpiar la casa'
                    "
                    src="../assets/31.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer manualidades'"
                    src="../assets/32.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Pintar'"
                    src="../assets/33.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Hacer una visita virtual a un museo'
                    "
                    src="../assets/34.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Jugar a un videojuego'"
                    src="../assets/35.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer un puzle'"
                    src="../assets/36.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre ===
                        'Hacer una videollamada con amigos o familiares'
                    "
                    src="../assets/37.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Hacer un curso online'"
                    src="../assets/38.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Mirar las estrellas'"
                    src="../assets/39.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a una cafetería'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir de tapas'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir a un restaurante'"
                    src="../assets/7.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Ir al gimnasio'"
                    src="../assets/40.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Astorga'"
                    src="../assets/41.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar las Médulas'"
                    src="../assets/42.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ponferrada'"
                    src="../assets/43.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar la cueva de Valporquero'
                    "
                    src="../assets/44.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Riaño'"
                    src="../assets/45.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Babia'"
                    src="../assets/46.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar las Tuerces'"
                    src="../assets/47.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Pedraza'"
                    src="../assets/48.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar La Alberca'"
                    src="../assets/49.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar el parque de los Picos de Europa'
                    "
                    src="../assets/50.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Soria'"
                    src="../assets/51.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Puebla de Sanabria'"
                    src="../assets/52.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Segovia'"
                    src="../assets/53.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Arribes del Duero'"
                    src="../assets/54.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar las cascadas de Burgos'"
                    src="../assets/55.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Valladolid'"
                    src="../assets/56.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Candelario'"
                    src="../assets/57.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ciudad Rodrigo'"
                    src="../assets/58.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Mogarraz'"
                    src="../assets/59.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Penalba de Santiago'"
                    src="../assets/60.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Sepúlveda'"
                    src="../assets/61.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ayllon'"
                    src="../assets/62.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Maderuelo'"
                    src="../assets/63.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ureña'"
                    src="../assets/64.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Frias'"
                    src="../assets/65.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Medinaceli'"
                    src="../assets/66.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Covarrubias'"
                    src="../assets/67.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Vinuesa'"
                    src="../assets/68.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Ledesma'"
                    src="../assets/69.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Lerma'"
                    src="../assets/70.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Miranda del Castañar'"
                    src="../assets/71.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Yanguas'"
                    src="../assets/72.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Caleruega'"
                    src="../assets/73.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar Castrillo de los Polvazares'
                    "
                    src="../assets/74.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="
                      item.nombre === 'Visitar Monteagudo de las Vicarias'
                    "
                    src="../assets/75.jpg"
                    height="400px"
                  ></v-img>

                  <v-img
                    v-else-if="item.nombre === 'Visitar Bonilla de la Sierra'"
                    src="../assets/76.jpg"
                    height="400px"
                  ></v-img>

                  <v-img v-else src="../assets/2.jpg" height="400px"></v-img>
                  <v-card-title>{{ item.nombre }}</v-card-title>
                  
                  <v-card-actions> </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    array: [],
    definitivo: [],
    arrayIngredientes: [],
    element: {},
    entornos: ["Interiores", "Exteriores"],
    entor: null,
    modalidades: ["Individual", "Grupo"],
    modali: null,
    precios: ["Gratis", "Pagando"],
    prec: null,
    localizaciones: ["Dentro de León", "Fuera de León"],
    locali: null,
    actividadesFisicas: ["Con actividad física", "Sin actividad física"],
    afis: null,

    actividades: [
      "Visitar la catedral de León",
      "Visitar la Basílica de San Isidoro",
      "Visitar Convento San Marcos",
      "Visitar la Casa Botines de Gaudí",
      "Visitar el Palacio de los Guzmanes",
      "Visitar el Palacio Conde Luna",
      "Visitar el centro de León",
      "Ir al museo MUSAC",
      "Ir al museo de León",
      "Ir al museo de la fauna salvaje",
      "Pasear por el parque de la Candamia",
      "Correr por el parque de la Candamia",
      "Pasear en bici por el parque de la Candamia",
      "Pasear por el parque La Granja",
      "Correr por el parque La Granja",
      "Pasear en bici por el parque La Granja",
      "Hacer deporte en exteriores",
      "Hacer deporte en casa",
      "Hacer la ruta de las Zancas",
      "Ir al parque acuático Isla León",
      "Hacer una cata de vinos",
      "Ir a mirar un partido",
      "Ir al cine",
      "Ir al centro comercial",
      "Tomar el sol",
      "Jugar a juegos de mesa",
      "Ir a los karts",
      "Hacer voluntariado",
      "Ir al laser tag",
      "Volar una cometa",
      "Leer un libro",
      "Escuchar música o un podcast",
      "Cocinar",
      "Mirar la tele, Netflix, …",
      "Tocar algún instrumento o aprender a hacerlo ",
      "Aprender un nuevo idioma o un lenguaje de programación",
      "Organizar, ordenar o limpiar la casa",
      "Hacer manualidades",
      "Pintar",
      "Hacer una visita virtual a un museo",
      "Jugar a un videojuego",
      "Hacer un puzle",
      "Hacer una videollamada con amigos o familiares",
      "Hacer un curso online",
      "Mirar las estrellas",
      "Ir a una cafetería",
      "Ir de tapas",
      "Ir a un restaurante",
      "Ir al gimnasio",
      "Visitar Astorga",
      "Visitar las Médulas",
      "Visitar Ponferrada",
      "Visitar la cueva de Valporquero",
      "Visitar Riaño",
      "Visitar Babia",
      "Visitar las Tuerces",
      "Visitar Pedraza",
      "Visitar La Alberca",
      "Visitar el parque de los Picos de Europa",
      "Visitar Soria",
      "Visitar Puebla de Sanabria",
      "Visitar Segovia",
      "Visitar Arribes del Duero",
      "Visitar las cascadas de Burgos",
      "Visitar Valladolid",
      "Visitar Candelario",
      "Visitar Ciudad Rodrigo",
      "Visitar Mogarraz",
      "Visitar Penalba de Santiago",
      "Visitar Sepúlveda",
      "Visitar Ayllon",
      "Visitar Maderuelo",
      "Visitar Ureña",
      "Visitar Frias",
      "Visitar Medinaceli",
      "Visitar Covarrubias",
      "Visitar Vinuesa",
      "Visitar Ledesma",
      "Visitar Lerma",
      "Visitar Miranda del Castañar",
      "Visitar Yanguas",
      "Visitar Caleruega",
      "Visitar Castrillo de los Polvazares",
      "Visitar Monteagudo de las Vicarias",
      "Visitar Bonilla de la Sierra",
    ],
    items: [],
    snackbarUsuario: false,
    snackbarNyte: false,
    text: "Error de usuario o contraseña",
    timeout: 3000,
    segundaFase: false,
    aleatorio: false,
    caracActividad: false,
    drawer: null,
    v_register: false,
    v_login: false,
    nacimiento_registrar: 1900,
    name_register: "",
    user_register: "",
    pass_registrar: "",
    user: "",
    password: "",
    bool_login: false,
    show1: false, 
    show2: false, 
    tooltip: false,
  }),

  methods: {
    registrar() {
      var form = new Object();
      form.nombre = this.name_register;
      form.usuario = this.user_register;
      form.password = this.pass_registrar;
      form.nacimiento = this.nacimiento_registrar;

      this.$http.post("http://localhost:3000/usuarios", form).then(
        () => {
          this.user = this.user_register;
          this.password = this.pass_registrar;
          this.bool_login = true;
          var color = document.getElementById("inspire");
          color.style.backgroundColor = "#cyan darken-1";
          this.cerrar_registrar();
        },
        (response) => {
          alert(response.body);
        }
      );
    },

    cerrar_registrar() {
      this.user_register = "";
      this.pass_registrar = "";
      this.v_register = false;
      this.show2 = false;
      this.array = [];
    },

    login() {
      var form = new Object();
      form.usuario = this.nombre_login;
      form.password = this.pass_login;
      this.array = [];
      this.caracActividad = false;
      this.aleatorio = false;

      if (this.user !== null && this.password !== null) {
        var data = { user: this.user, password: this.password };

        this.$http.post("http://localhost:3000/login", data).then(
          (response) => {
            if (response.body.message == false) {
              this.snackbarUsuario = true;
            } else {
              this.bool_login = true;
              this.usuario = response.body.usuario;
              var color = document.getElementById("inspire");
              color.style.backgroundColor = "#cyan darken-1";
              this.cerrar_login();
            }
          },
          (response) => {
            alert(JSON.stringify(response.body));
          }
        );
      }
    },

    cerrar_login() {
      this.nombre_login = "";
      this.pass_login = "";
      this.v_login = false;
      this.show2 = false;
      this.array = [];
    },

    actividadAzar() {
      this.array = [];
      var data = { user: this.user, password: this.password };
      this.caracActividad = false;
      this.aleatorio = true;

      this.$http.post("http://localhost:3000/actividadAzar", data).then(
        (response) => {
          this.array.push(response.body);
        },
        (response) => {
          alert(JSON.stringify(response.body));
        }
      );
    },

    buscarActividadCaracteristicas() {
      this.array = [];
      this.caracActividad = true;
      this.aleatorio = false;
      var data = {
        user: this.user,
        entorno: this.entor,
        modalidad: this.modali,
        precio: this.prec,
        localizacion: this.locali,
        actividadFisica: this.afis,
      };

      this.$http.post("http://localhost:3000/buscaActividad", data).then(
        (response) => {
          this.array = response.body;
        },
        (response) => {
          alert(JSON.stringify(response.body));
        }
      );
    },

    cerrar_sesion() {
      this.bool_login = false;
      this.e1 = undefined;
      this.locali = undefined;
      this.afis = undefined;
      this.entor = undefined;
      this.modal = undefined;
      this.prec = undefined;
      this.array = [];
      this.user = "";
      this.password = "";

      this.tooltip = false;
      this.show1 = false;
      var color = document.getElementById("inspire");
      color.style.backgroundColor = "#cyan darken-1";
    },
  },
};
</script>
