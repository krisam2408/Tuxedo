namespace TuxedoASP.Models;

public sealed class AppSettings
{
    private readonly LinkedResource[] m_styles;
    public string[] Styles => m_styles
        .Select(s => s.StyleTag)
        .ToArray();

    private readonly LinkedResource[] m_scripts;
    public string[] Scripts => m_scripts
        .Select(s => s.ScriptTag)
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
                    return new LinkedResource()
                    {
                        IsValid = false
                    };

                string? integrity = s.GetSection("integrity").Value;
                string? crossorigin = s.GetSection("crossorigin").Value;

                return new LinkedResource()
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
                    return new LinkedResource()
                    {
                        IsValid = false
                    };

                string? integrity = s.GetSection("integrity").Value;
                string? crossorigin = s.GetSection("crossorigin").Value;

                return new LinkedResource()
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

    private struct LinkedResource
    {
        public string Link;
        public string? Integrity;
        public string? CrossOrigin;
        public bool IsValid;

        public string StyleTag
        {
            get
            {
                if(string.IsNullOrWhiteSpace(Integrity) || string.IsNullOrWhiteSpace(CrossOrigin))
                    return $"<link href=\"{Link}\" rel=\"stylesheet\" />";
                return $"<link href=\"{Link}\" rel=\"stylesheet\" integrity=\"{Integrity}\" crossorigin=\"{CrossOrigin}\" />";
            }
        }

        public string ScriptTag
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
