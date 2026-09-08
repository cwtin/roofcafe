const loginView =
  document.getElementById("loginView");

const panelView =
  document.getElementById("panelView");

const editor =
  document.getElementById("editor");

const panelMsg =
  document.getElementById("panelMsg");


let adminMenu = [];


const clone = x =>
  JSON.parse(
    JSON.stringify(x)
  );


function defaults() {

  const m =
    clone(
      window.DEFAULT_MENU_DATA || []
    );


  m.forEach(c => {

    if (
      c.active === undefined
    ) {
      c.active = true;
    }


    (
      c.products || []
    ).forEach(p => {

      if (
        p.active === undefined
      ) {
        p.active = true;
      }


      if (
        p.price === undefined
      ) {
        p.price = "BOŞ";
      }

    });


    (
      c.subcategories || []
    ).forEach(s => {

      if (
        s.active === undefined
      ) {
        s.active = true;
      }


      (
        s.products || []
      ).forEach(p => {

        if (
          p.active === undefined
        ) {
          p.active = true;
        }


        if (
          p.price === undefined
        ) {
          p.price = "BOŞ";
        }

      });

    });

  });


  return m;

}


function esc(s = "") {

  return String(s).replace(

    /[&<>"]/g,

    m => ({

      "&": "&amp;",

      "<": "&lt;",

      ">": "&gt;",

      '"': "&quot;"

    }[m])

  );

}


function render() {

  editor.innerHTML =
    adminMenu.map(

      (
        c,
        ci
      ) => {

        const productCount =
          c.subcategories

            ? c.subcategories.reduce(
                (
                  total,
                  sub
                ) =>
                  total +
                  (
                    sub.products || []
                  ).length,

                0
              )

            : (
                c.products || []
              ).length;


        return `

          <section
            class="category"
            data-ci="${ci}"
          >

            <div
              class="category-header"
            >

              <div
                class="category-name"
              >

                <span
                  class="category-index"
                >
                  ${
                    ci + 1
                  }
                </span>

                <div>

                  <h3>
                    ${
                      esc(
                        c.name
                      )
                    }
                  </h3>

                  <span>
                    ${
                      productCount
                    }
                    ürün
                  </span>

                </div>

              </div>


              <div
                class="category-settings"
              >

                <label
                  class="switch"
                >

                  <input
                    type="checkbox"
                    data-f="active"
                    ${
                      c.active !== false
                        ? "checked"
                        : ""
                    }
                  >

                  Kategori aktif

                </label>

              </div>

            </div>


            <div
              class="category-body"
            >

              <div
                class="category-fields"
              >

                <input
                  data-f="name"
                  value="${
                    esc(
                      c.name
                    )
                  }"
                  placeholder="Kategori adı"
                >

              </div>


              ${
                c.subcategories

                  ? c.subcategories
                      .map(
                        (
                          s,
                          si
                        ) =>
                          subHTML(
                            s,
                            ci,
                            si
                          )
                      )
                      .join("")

                  : `

                    <div
                      class="product-section"
                    >

                      <div
                        class="product-section-title"
                      >

                        <h4>
                          Ürünler
                        </h4>

                        <span
                          class="product-count"
                        >
                          ${
                            (
                              c.products || []
                            ).length
                          }
                          ÜRÜN
                        </span>

                      </div>


                      <div
                        class="product-list"
                      >

                        ${
                          (
                            c.products || []
                          )
                            .map(
                              (
                                p,
                                pi
                              ) =>
                                prodHTML(
                                  p,
                                  ci,
                                  null,
                                  pi
                                )
                            )
                            .join("")
                        }

                      </div>

                    </div>

                  `
              }

            </div>

          </section>

        `;

      }

    ).join("");


  bind();

}


function subHTML(
  s,
  ci,
  si
) {

  return `

    <div
      class="subcategory-block"
      data-ci="${ci}"
      data-si="${si}"
    >

      <div
        class="subcategory-header"
      >

        <div>

          <span
            class="eyebrow"
          >
            MUTFAK
          </span>

          <h4>
            ${
              esc(
                s.name
              )
            }
          </h4>

        </div>


        <label
          class="switch"
        >

          <input
            type="checkbox"
            data-sf="active"
            ${
              s.active !== false
                ? "checked"
                : ""
            }
          >

          Aktif

        </label>

      </div>


      <div
        class="subcategory-fields"
      >

        <input
          data-sf="name"
          value="${
            esc(
              s.name
            )
          }"
          placeholder="Alt kategori adı"
        >


        <input
          data-sf="subtitle"
          value="${
            esc(
              s.subtitle || ""
            )
          }"
          placeholder="Alt kategori açıklaması"
        >

      </div>


      <div
        class="product-section"
      >

        <div
          class="product-section-title"
        >

          <h4>
            Ürünler
          </h4>

          <span
            class="product-count"
          >
            ${
              (
                s.products || []
              ).length
            }
            ÜRÜN
          </span>

        </div>


        <div
          class="product-list"
        >

          ${
            (
              s.products || []
            )
              .map(
                (
                  p,
                  pi
                ) =>
                  prodHTML(
                    p,
                    ci,
                    si,
                    pi
                  )
              )
              .join("")
          }

        </div>

      </div>

    </div>

  `;

}


function prodHTML(
  p,
  ci,
  si,
  pi
) {

  return `

    <div
      class="product-card"
      data-ci="${ci}"
      data-si="${
        si === null
          ? ""
          : si
      }"
      data-pi="${pi}"
    >

      <div
        class="product-main"
      >

        <input
          data-pf="name"
          value="${
            esc(
              p.name
            )
          }"
          placeholder="Ürün adı"
        >

      </div>


      <div
        class="product-price"
      >

        <input
          data-pf="price"
          value="${
            esc(
              p.price || "BOŞ"
            )
          }"
          placeholder="Fiyat"
        >

      </div>


      <label
        class="switch"
      >

        <input
          type="checkbox"
          data-pf="active"
          ${
            p.active !== false
              ? "checked"
              : ""
          }
        >

        Aktif

      </label>


      ${
        p.desc !== undefined

          ? `

            <textarea
              class="product-description"
              data-pf="desc"
              placeholder="Ürün açıklaması"
            >${
              esc(
                p.desc || ""
              )
            }</textarea>

          `

          : ""
      }

    </div>

  `;

}


function bind() {

  editor
    .querySelectorAll(
      "[data-f]"
    )
    .forEach(el => {

      el.oninput = () => {

        const c =
          adminMenu[
            +el
              .closest(
                ".category"
              )
              .dataset
              .ci
          ];


        c[
          el.dataset.f
        ] =
          el.type === "checkbox"

            ? el.checked

            : el.value;

      };

    });


  editor
    .querySelectorAll(
      "[data-sf]"
    )
    .forEach(el => {

      el.oninput = () => {

        const box =
          el.closest(
            "[data-si]"
          );


        const s =
          adminMenu[
            +box.dataset.ci
          ]
            .subcategories[
              +box.dataset.si
            ];


        s[
          el.dataset.sf
        ] =
          el.type === "checkbox"

            ? el.checked

            : el.value;

      };

    });


  editor
    .querySelectorAll(
      "[data-pf]"
    )
    .forEach(el => {

      el.oninput = () => {

        const row =
          el.closest(
            "[data-pi]"
          );


        const ci =
          +row.dataset.ci;


        const pi =
          +row.dataset.pi;


        const si =
          row.dataset.si;


        const p =
          si === ""

            ? adminMenu[
                ci
              ]
                .products[
                  pi
                ]

            : adminMenu[
                ci
              ]
                .subcategories[
                  +si
                ]
                .products[
                  pi
                ];


        p[
          el.dataset.pf
        ] =
          el.type === "checkbox"

            ? el.checked

            : el.value;

      };

    });

}


document
  .getElementById(
    "loginForm"
  )
  .onsubmit =
  async e => {

    e.preventDefault();


    document
      .getElementById(
        "loginMsg"
      )
      .textContent =
      "Giriş yapılıyor...";


    try {

      await roofAuth
        .signInWithEmailAndPassword(

          document
            .getElementById(
              "email"
            )
            .value
            .trim(),

          document
            .getElementById(
              "password"
            )
            .value

        );


      document
        .getElementById(
          "loginMsg"
        )
        .textContent = "";

    }

    catch(err) {

      document
        .getElementById(
          "loginMsg"
        )
        .textContent =
        "Giriş başarısız: " +
        err.message;

    }

  };


document
  .getElementById(
    "logoutBtn"
  )
  .onclick =
  () =>
    roofAuth.signOut();


document
  .getElementById(
    "saveBtn"
  )
  .onclick =
  async () => {

    panelMsg.textContent =
      "Kaydediliyor...";


    try {

      await roofDb
        .ref(
          "menu"
        )
        .set(
          adminMenu
        );


      panelMsg.textContent =
        "✓ Menü Firebase’e kaydedildi ve yayına yansıdı.";

    }

    catch(e) {

      panelMsg.textContent =
        "Kayıt hatası: " +
        e.message;

    }

  };


roofAuth
  .onAuthStateChanged(

    async user => {

      if(!user) {

        loginView
          .classList
          .remove(
            "hidden"
          );


        panelView
          .classList
          .add(
            "hidden"
          );


        return;

      }


      loginView
        .classList
        .add(
          "hidden"
        );


      panelView
        .classList
        .remove(
          "hidden"
        );


      document
        .getElementById(
          "statusText"
        )
        .textContent =
        "Bağlı: " +
        user.email;


      try {

        const snap =
          await roofDb
            .ref(
              "menu"
            )
            .once(
              "value"
            );


        if(
          snap.exists() &&
          Array.isArray(
            snap.val()
          )
        ) {

          adminMenu =
            snap.val();

        }

        else {

          adminMenu =
            defaults();

        }


        render();

      }

      catch(e) {

        adminMenu =
          defaults();


        render();


        panelMsg.textContent =
          "Veritabanı okunamadı: " +
          e.message;

      }

    }

  );