using Newtonsoft.Json;

namespace TuxedoASP.Models;

public sealed class AppSettings
{
    private readonly Style[] m_styles;
    public string[] Styles => m_styles
        .Select(s => s.Html)
        .ToArray();

    private readonly Script[] m_scripts;
    public string[] Scripts => m_scripts
        .Select(s => s.Html)
        .ToArray();

    private static AppSettings? m_instance;
    public static AppSettings Instance
    {
        get
        {
            if (m_instance == null)
                throw new NullReferenceException();
            return m_instance;
        }
    }

    public static void Initialize(IConfiguration configuration)
    {
        m_instance = new(configuration);
    }

    private AppSettings(IConfiguration configuration)
    {
        IConfigurationSection[] styleSection = configuration
            .GetSection("Styles")
            .GetChildren()
            .ToArray();

        if (styleSection is null)
            throw new NullReferenceException();

        m_styles = styleSection
            .Select(s =>
            {
                string? link = s.GetSection("link").Value;
                if (string.IsNullOrWhiteSpace(link))
                    return new Style()
                    {
                        IsValid = false
                    };

                string? integrity = s.GetSection("integrity").Value;
                string? crossorigin = s.GetSection("crossorigin").Value;

                return new Style()
                {
                    Link = link,
                    Integrity = integrity,
                    CrossOrigin = crossorigin,
                    IsValid = true
                };
            })
            .Where(s => s.IsValid)
            .ToArray();

        IConfigurationSection[] scriptSection = configuration
            .GetSection("Scripts")
            .GetChildren()
            .ToArray();

        if (scriptSection is null)
            throw new NullReferenceException();

        m_scripts = scriptSection
            .Select(s =>
            {
                string? link = s.GetSection("link").Value;
                if (string.IsNullOrWhiteSpace(link))
                    return new Script()
                    {
                        IsValid = false
                    };

                string? integrity = s.GetSection("integrity").Value;
                string? crossorigin = s.GetSection("crossorigin").Value;

                return new Script()
                {
                    Link = link,
                    Integrity = integrity,
                    CrossOrigin = crossorigin,
                    IsValid = true
                };
            })
            .Where(s => s.IsValid)
            .ToArray();
    }

    private struct Style
    {
        public string Link;
        public string? Integrity;
        public string? CrossOrigin;
        public bool IsValid;

        public string Html
        {
            get
            {
                if(string.IsNullOrWhiteSpace(Integrity) || string.IsNullOrWhiteSpace(CrossOrigin))
                    return $"<link href=\"{Link}\" rel=\"stylesheet\" />";
                return $"<link href=\"{Link}\" rel=\"stylesheet\" integrity=\"{Integrity}\" crossorigin=\"{CrossOrigin}\" />";
            }
        }
    }

    private struct Script
    {
        public string Link;
        public string? Integrity;
        public string? CrossOrigin;
        public bool IsValid;

        public string Html
        {
            get
            {
                if (string.IsNullOrWhiteSpace(Integrity) || string.IsNullOrWhiteSpace(CrossOrigin))
                    return $"<script src=\"{Link}\"></script>";
                return $"<script src=\"{Link}\" integrity=\"{Integrity}\" crossorigin=\"{CrossOrigin}\"></script>";
            }
        }
    }
}
