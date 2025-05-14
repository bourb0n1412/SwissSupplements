package ch.bbw.shopservice.shop_service;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5001"})
public class ProductController {

    @GetMapping
    public List<Product> getProducts() {
        return List.of(
                new Product("1", "Looksmaxxing Mogger Box", "Die Alpha-Formel: Collagen, Omega-3, CoQ10 und Astaxanthin für dein Äusseres.", 74.99, "/pic/looksmax_mogger_box.png"),
                new Product("2", "Muscle & Performance Stack", "Alles für den Aufbau: Kreatin, Pre-Workout, Testo und Zink+Magnesium.", 69.99, "/pic/muscle_performance_stack.png"),
                new Product("3", "Beauty & Glow Box", "Biotin, Kollagen, L-Theanin und Debloat – deine Essentials für natürliche Schönheit.", 64.99, "/pic/beauty_glow_box.png"),
                new Product("4", "Essential Stack", "Kreatin, Omega-3 und Whey – gebündelte Power für Muskelaufbau, Fokus und Erholung.", 49.99, "/pic/essential_stack.png"),

                new Product("5", "Debloat Support", "Gezielte Hilfe gegen Blähbauch und Völlegefühl mit natürlichen Inhaltsstoffen.", 17.99, "/pic/debloat_support.png"),
                new Product("6", "Collagen Complex", "Kollagen, Vitamin C und Hyaluronsäure für straffe Haut und gesunde Gelenke.", 22.99, "/pic/collagen_complex.png"),
                new Product("7", "Omega-3 Hochdosiert", "Reinste Omega-3-Fettsäuren für Herz, Hirn und Hautgesundheit.", 19.99, "/pic/omega3_hochdosiert.png"),
                new Product("8", "Coenzym Q10", "Zellschutz und Anti-Aging in einer Kapsel – für jugendliche Haut und Energie.", 21.99, "/pic/coq10.png"),
                new Product("9", "Astaxanthin Antioxidans", "Starkes Antioxidans für Zellschutz und gesunde, strahlende Haut.", 23.99, "/pic/astaxanthin.png"),
                new Product("10", "Vitamin D3+K2 Tropfen", "Für Knochen, Haut und Hormonhaushalt – hoch bioverfügbar und effektiv.", 18.99, "/pic/vitamin_d3_k2.png"),
                new Product("11", "Performance Support", "Testo, Pre-Workout, BCAA und Vitamin D3+K2 für maximale Leistungsfähigkeit.", 59.99, "/pic/performance_support.png")
          );
    }
}

