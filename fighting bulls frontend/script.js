// ============================
// Fighting Bulls Academy
// Validación inteligente + envío a WhatsApp
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contacto form");
  if (!form) return;

  const status = document.getElementById("formStatus");

  // Inputs según tu HTML
  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  const interes = document.getElementById("interes");
  const edad = document.getElementById("edad");
  const horario = document.getElementById("horario");
  const mensaje = document.getElementById("mensaje");

  // Número destino (AJUSTA al real)
  const WHATSAPP_NUMBER = "5215579389286"; // formato wa.me (521 + 10 dígitos)

  // API base (frontend solamente; Cloudflare Pages)
  const API_BASE =
    (window?.ENV?.VITE_API_URL || "").trim() ||
    "https://scintillating-learning-production-8dd0.up.railway.app";
  const API_LEADS_ENDPOINT = `${API_BASE.replace(/\/$/, "")}/api/leads`;

  // ---------- Helpers UI ----------
  function setStatus(msg, type = "error") {
    if (!status) return;
    status.textContent = msg;
    status.classList.add("show");
    status.classList.toggle("error", type === "error");
    status.classList.toggle("success", type === "success");
  }

  function clearStatus() {
    if (!status) return;
    status.textContent = "";
    status.classList.remove("show", "error", "success");
  }

  function setError(input, msg) {
    clearError(input);
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");

    if (!status || !status.textContent) {
      setStatus(msg, "error");
    }

    const small = document.createElement("small");
    small.className = "field-error";
    small.textContent = msg;

    input.insertAdjacentElement("afterend", small);
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    const next = input.nextElementSibling;
    if (next && next.classList.contains("field-error")) next.remove();
  }

  function clearAllErrors() {
    clearStatus();
    [nombre, telefono, email, interes, edad, horario, mensaje].forEach((el) => {
      if (el) clearError(el);
    });
  }

  // Normaliza teléfono: deja solo dígitos, quita +, espacios, guiones, etc.
  function normalizePhone(raw) {
    return String(raw || "").replace(/\D/g, "");
  }

  // Valida teléfono MX:
  // - 10 dígitos (5512345678)
  // - o 52 + 10 dígitos (525512345678)
  // - o 521 + 10 dígitos (5215512345678) (algunos lo ponen así)
  function isValidMXPhone(digits) {
    if (digits.length === 10) return true;
    if (digits.length === 12 && digits.startsWith("52")) return true;
    if (digits.length === 13 && digits.startsWith("521")) return true;
    return false;
  }

  // Limpia y "acomoda" a formato WhatsApp: 521 + 10 dígitos
  function toWhatsAppPhone(digits) {
    // Si viene 10 dígitos -> 521 + 10
    if (digits.length === 10) return "521" + digits;

    // Si viene 52 + 10 -> conviértelo a 521 + 10
    if (digits.length === 12 && digits.startsWith("52")) {
      return "521" + digits.slice(2);
    }

    // Si ya viene 521 + 10 -> úsalo
    if (digits.length === 13 && digits.startsWith("521")) return digits;

    // fallback
    return digits;
  }

  // Mensaje final para WhatsApp
  function buildWhatsAppMessage(data) {
    const lines = [
      "Hola, quiero información / agendar clase de prueba en Fighting Bulls Academy.",
      "",
      `Nombre: ${data.nombre}`,
      `WhatsApp: ${data.telefono}`,
      `Interés: ${data.interes}`,
    ];

    if (data.edad) lines.push(`Edad: ${data.edad}`);
    if (data.horario) lines.push(`Horario preferido: ${data.horario}`);
    if (data.email) lines.push(`Correo: ${data.email}`);
    if (data.mensaje) lines.push(`Mensaje: ${data.mensaje}`);

    return lines.join("\n");
  }

  // ---------- Validación ----------
  function validate() {
    let ok = true;
    clearAllErrors();

    const nombreVal = nombre.value.trim();
    const telRaw = telefono.value.trim();
    const telDigits = normalizePhone(telRaw);
    const interesVal = interes.value;

    // Nombre: mínimo 2 letras
    if (nombreVal.length < 2) {
      setError(nombre, "Escribe tu nombre (mínimo 2 caracteres).");
      ok = false;
    }

    // Teléfono: formato MX
    if (!telDigits) {
      setError(telefono, "Escribe tu teléfono / WhatsApp.");
      ok = false;
    } else if (!isValidMXPhone(telDigits)) {
      setError(telefono, "Teléfono inválido. Usa 10 dígitos o +52.");
      ok = false;
    }

    // Interés: obligatorio
    if (!interesVal) {
      setError(interes, "Selecciona la clase que te interesa.");
      ok = false;
    }

    // Email: si lo ponen, que sea válido
    const emailVal = (email?.value || "").trim();
    if (emailVal.length > 0) {
      // Validación simple (el input type=email ya ayuda)
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      if (!emailOk) {
        setError(email, "Correo inválido. Revisa el formato.");
        ok = false;
      }
    }

    return { ok, telDigits };
  }

  // Validación al escribir (más “inteligente”)
  [nombre, telefono, email].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      clearError(input);
      clearStatus();
    });
    input.addEventListener("blur", () => {
      // micro-validación al salir del campo
      if (input === telefono) {
        const digits = normalizePhone(telefono.value);
        if (telefono.value.trim() && !isValidMXPhone(digits)) {
          setError(telefono, "Teléfono inválido. Usa 10 dígitos o +52.");
        }
      }
      if (input === nombre) {
        if (nombre.value.trim() && nombre.value.trim().length < 2) {
          setError(nombre, "Escribe tu nombre (mínimo 2 caracteres).");
        }
      }
      if (input === email) {
        const v = email.value.trim();
        if (v) {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          if (!emailOk) setError(email, "Correo inválido. Revisa el formato.");
        }
      }
    });
  });

  [interes, edad, horario, mensaje].forEach((input) => {
    if (!input) return;
    input.addEventListener("change", () => clearError(input));
    input.addEventListener("input", () => {
      clearError(input);
      clearStatus();
    });
  });

  // ---------- Submit ----------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = validate();
    if (!result.ok && status && !status.textContent) {
      setStatus("Revisa los campos marcados.", "error");
    }
    if (!result.ok) {
      // Enfoca el primer error
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Construir data
    const data = {
      nombre: nombre.value.trim(),
      telefono: toWhatsAppPhone(result.telDigits),
      email: (email?.value || "").trim(),
      interes: interes.options[interes.selectedIndex]?.text || interes.value,
      edad: edad?.options[edad.selectedIndex]?.text || "",
      horario: horario?.options[horario.selectedIndex]?.text || "",
      mensaje: (mensaje?.value || "").trim(),
    };

    let leadSaved = false;
    try {
      const response = await fetch(API_LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resultBody = await response.json().catch(() => null);
      if (!response.ok) {
        console.error("Lead save failed:", resultBody);
        alert("No pudimos guardar tus datos. Intenta de nuevo en un momento.");
        return;
      }
      leadSaved = true;
    } catch (err) {
      console.error("Lead save error:", err);
      alert("No pudimos guardar tus datos. Intenta de nuevo en un momento.");
      return;
    }

    if (!leadSaved) return;

    if (typeof window.fbq === "function") {
      // Track only after the backend confirms the lead was saved.
      window.fbq("track", "Lead");
    }

    // Abrir WhatsApp (alta conversión)
    const text = encodeURIComponent(buildWhatsAppMessage(data));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");

    // Opcional: feedback visual + reset
    form.reset();
    clearStatus();
  });
});

// ===== Botón "Subir al inicio" =====
document.addEventListener("DOMContentLoaded", () => {
  const toTopBtn = document.getElementById("toTopBtn");
  if (!toTopBtn) return;

  // inicia oculto
  toTopBtn.classList.add("is-hidden");

  window.addEventListener("scroll", () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    // aparece después de 500px de scroll
    if (y > 500) {
      toTopBtn.classList.remove("is-hidden");
    } else {
      toTopBtn.classList.add("is-hidden");
    }
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
/* =========================
   OCULTAR WHATSAPP AL ENTRAR A CONTACTO
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.querySelector(".fab-whatsapp");
  const contactoSection = document.querySelector("#contacto");

  if (!whatsappBtn || !contactoSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Estamos viendo la sección contacto → ocultar WhatsApp
          whatsappBtn.classList.add("is-hidden");
        } else {
          // Salimos de contacto → mostrar WhatsApp
          whatsappBtn.classList.remove("is-hidden");
        }
      });
    },
    {
      threshold: 0.35 // cuando ~35% del formulario es visible
    }
  );

  observer.observe(contactoSection);
});
/* =========================
   PULSO WHATSAPP DESPUÉS DE 5s
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.querySelector(".fab-whatsapp");

  if (!whatsappBtn) return;

  // Espera 5 segundos antes de activar el pulso
  setTimeout(() => {
    whatsappBtn.classList.add("pulse");
  }, 5000);
});
